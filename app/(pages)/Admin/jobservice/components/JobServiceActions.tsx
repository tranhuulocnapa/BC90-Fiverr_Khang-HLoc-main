"use client";

import { useState } from "react";
import JobServiceModal from "./JobServiceModal";
import { toast } from "sonner";
import api from "@/app/services/api";
import { useRouter } from "next/navigation";

type Props = {
    serviceId: number;
};

export default function JobServiceActions({ serviceId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingService, setLoadingService] = useState(false);
    const [open, setOpen] = useState(false);
    const [service, setService] = useState<any | null>(null);

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;

        try {
            setLoading(true);
            const res = await api.delete(`thue-cong-viec/${serviceId}`);

            if (res.status !== 200 && res.status !== 201) {
                toast.error(res.data?.content || "Xóa thất bại");
                return;
            }

            toast.success("Xóa thành công");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        try {
            setLoadingService(true);
            const res = await api.get(`thue-cong-viec/${serviceId}`);
            const data = res.data?.content || res.data;

            if (!data) {
                toast.error("Không tìm thấy thông tin dịch vụ");
                return;
            }

            setService(data);
            setOpen(true);
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setLoadingService(false);
        }
    };

    return (
        <>
            <div className="flex justify-center gap-2">
                <button
                    onClick={handleEdit}
                    disabled={loadingService}
                    className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {loadingService ? "Đang tải..." : "Edit"}
                </button>

                <button
                    disabled={loading}
                    onClick={handleDelete}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                >
                    {loading ? "Đang xóa..." : "Xóa"}
                </button>
            </div>

            <JobServiceModal
                open={open}
                service={service}
                onClose={() => {
                    setOpen(false);
                    setService(null);
                }}
            />
        </>
    );
}
