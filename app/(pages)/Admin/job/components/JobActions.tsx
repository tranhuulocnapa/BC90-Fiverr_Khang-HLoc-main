"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import JobModal from "./JobModal";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    jobId: number;
};

export default function JobActions({ jobId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [loadingJob, setLoadingJob] = useState(false);
    const [open, setOpen] = useState(false);
    const [job, setJob] = useState<any | null>(null);

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc muốn xóa công việc này?")) return;

        try {
            setLoading(true);

            const userAdminRaw = typeof window !== 'undefined' ? localStorage.getItem('USER_ADMIN') : null;
            const userAdmin = userAdminRaw ? JSON.parse(userAdminRaw) : null;
            const accessToken = userAdmin?.accessToken || userAdmin?.token || userAdmin?.content?.token || userAdmin?.content?.accessToken || "";

            if (!accessToken) {
                toast.error('Token đăng nhập không tìm thấy. Vui lòng đăng nhập lại.');
                router.push('/Admin/login');
                return;
            }

            const res = await api.delete(`cong-viec/${jobId}`);

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
            setLoadingJob(true);

            const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

            const res = await api.get(`cong-viec/${jobId}`, {
                headers: {
                    'tokenCybersoft': TOKEN_CYBERSOFT
                }
            });

            const data = res.data;

            let jobData: any = null;
            if (Array.isArray(data)) jobData = data[0];
            else if (data && data.content) jobData = Array.isArray(data.content) ? data.content[0] : data.content;
            else if (data && data.data) jobData = Array.isArray(data.data) ? data.data[0] : data.data;
            else if (data && data.id) jobData = data;

            if (!jobData) {
                toast.error("Không tìm thấy thông tin công việc");
                return;
            }

            setJob(jobData);
            setOpen(true);
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setLoadingJob(false);
        }
    };

    return (
        <>
            <div className="flex justify-center gap-2">
                <button
                    onClick={handleEdit}
                    className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600"
                >
                    {loadingJob ? "Đang tải..." : "Edit"}
                </button>

                <button
                    disabled={loading}
                    onClick={handleDelete}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white
                hover:bg-red-600 disabled:opacity-50"
                >
                    {loading ? "Đang xóa..." : "Xóa"}
                </button>
            </div>

            <JobModal
                open={open}
                job={job}
                onClose={() => {
                    setOpen(false);
                    setJob(null);
                }}
            />
        </>
    );
}
