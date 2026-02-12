"use client";

import { useState } from "react";
import JobTypeModal from "./JobTypeModal";
import { toast } from "sonner";
import api from "@/app/services/api";
import { useRouter } from "next/navigation";

type Props = {
    jobTypeId: number;
};

export default function JobTypeActions({ jobTypeId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingJobType, setLoadingJobType] = useState(false);
    const [open, setOpen] = useState(false);
    const [jobType, setJobType] = useState<any | null>(null);

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc muốn xóa loại công việc này?")) return;

        try {
            setLoading(true);
            const res = await api.delete(`loai-cong-viec/${jobTypeId}`);

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
            setLoadingJobType(true);
            const res = await api.get(`loai-cong-viec/${jobTypeId}`);
            const data = res.data?.content || res.data;

            if (!data) {
                toast.error("Không tìm thấy thông tin loại công việc");
                return;
            }

            setJobType(data);
            setOpen(true);
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setLoadingJobType(false);
        }
    };

    return (
        <>
            <div className="flex justify-center gap-2">
                <button
                    onClick={handleEdit}
                    disabled={loadingJobType}
                    className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {loadingJobType ? "Đang tải..." : "Edit"}
                </button>

                <button
                    disabled={loading}
                    onClick={handleDelete}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                >
                    {loading ? "Đang xóa..." : "Xóa"}
                </button>
            </div>

            <JobTypeModal
                open={open}
                jobType={jobType}
                onClose={() => {
                    setOpen(false);
                    setJobType(null);
                }}
            />
        </>
    );
}
