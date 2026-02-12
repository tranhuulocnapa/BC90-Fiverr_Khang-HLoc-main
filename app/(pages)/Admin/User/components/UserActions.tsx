"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserModal from "./UserModal";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    userId: number;
};

export default function UserActions({ userId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // states for edit flow
    const [loadingUser, setLoadingUser] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any | null>(null);

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;

        try {
            setLoading(true);

            const res = await api.delete(`users?id=${userId}`);

            if (res.status !== 200) {
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
            setLoadingUser(true);

            const res = await api.get(`users/${userId}`);

            if (res.status !== 200) {
                toast.error(res.data?.content || "Tải user thất bại");
                return;
            }

            const data = res.data;
            let userData: any = null;

            if (Array.isArray(data)) {
                userData = data[0];
            } else if (data && data.content) {
                if (Array.isArray(data.content)) userData = data.content[0];
                else userData = data.content;
            } else if (data && (data.user || data.data)) {
                userData = data.user || data.data;
            } else if (data && data.id) {
                userData = data;
            } else {
                for (const k in data) {
                    const v = (data as any)[k];
                    if (v && typeof v === "object" && v.id) {
                        userData = v;
                        break;
                    }
                }
            }

            if (!userData) {
                toast.error("Không tìm thấy thông tin user");
                return;
            }

            if (userData.sdt && !userData.phone) userData.phone = userData.sdt;

            setUser(userData);
            setOpen(true);
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setLoadingUser(false);
        }
    };

    return (
        <>
            <div className="flex justify-center gap-2">
                <button
                    onClick={handleEdit}
                    className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600"
                >
                    {loadingUser ? "Đang tải..." : "Edit"}
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

            <UserModal
                open={open}
                user={user}
                onClose={() => {
                    setOpen(false);
                    setUser(null);
                }}
            />
        </>
    );
}
