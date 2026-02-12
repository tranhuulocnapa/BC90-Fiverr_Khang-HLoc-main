"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    open: boolean;
    jobType?: any;
    onClose: () => void;
};

export default function JobTypeModal({ open, jobType, onClose }: Props) {
    const router = useRouter();

    const initialForm = {
        tenLoaiCongViec: "",
    };
    const [form, setForm] = useState({
        tenLoaiCongViec: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (jobType) {
            setForm({
                tenLoaiCongViec: jobType.tenLoaiCongViec ?? "",
            });
        } else {
            setForm({
                tenLoaiCongViec: "",
            });
        }
    }, [jobType]);

    if (!open) return null;

    const handleSubmit = async () => {
        setErrors({});

        if (!form.tenLoaiCongViec.trim()) {
            setErrors({ tenLoaiCongViec: "Tên loại công việc không được bỏ trống" });
            return;
        }

        const isEdit = !!jobType;

        try {
            setSubmitting(true);

            const payload = {
                id: isEdit ? jobType.id : 0,
                tenLoaiCongViec: form.tenLoaiCongViec,
            };

            const res = isEdit
                ? await api.put(`loai-cong-viec/${jobType.id}`, payload)
                : await api.post(`loai-cong-viec`, payload);

            if (res.status !== 200 && res.status !== 201) {
                toast.error(res.data?.content || "Lỗi");
                return;
            }

            toast.success(isEdit ? "Cập nhật thành công" : "Thêm thành công");
            setForm(initialForm);
            setErrors({});
            onClose();
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl text-left">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {jobType ? "Chỉnh sửa loại công việc" : "Thêm loại công việc"}
                    </h2>
                </div>

                {/* Form */}
                <div className="space-y-4 px-6 py-5">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Tên loại công việc</label>
                        <input
                            value={form.tenLoaiCongViec}
                            onChange={(e) => setForm({ tenLoaiCongViec: e.target.value })}
                            placeholder="Nhập tên loại công việc"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.tenLoaiCongViec
                                ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.tenLoaiCongViec && <p className="text-xs text-red-500">{errors.tenLoaiCongViec}</p>}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
                    >
                        Hủy
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition ${submitting
                            ? "cursor-not-allowed bg-slate-400"
                            : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30"
                            }`}
                    >
                        {submitting ? "Đang lưu..." : "Lưu"}
                    </button>
                </div>
            </div>
        </div>
    );
}
