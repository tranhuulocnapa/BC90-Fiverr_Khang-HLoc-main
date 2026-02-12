"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    open: boolean;
    service?: any;
    onClose: () => void;
};

export default function JobServiceModal({ open, service, onClose }: Props) {
    const router = useRouter();

    const initialForm = {
        maCongViec: "",
        maNguoiThue: "",
        ngayThue: "",
        hoanThanh: false,
    };

    const [form, setForm] = useState({
        maCongViec: "",
        maNguoiThue: "",
        ngayThue: "",
        hoanThanh: false,
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (service) {
            setForm({
                maCongViec: (service.maCongViec ?? "") + "",
                maNguoiThue: (service.maNguoiThue ?? "") + "",
                ngayThue: service.ngayThue ?? "",
                hoanThanh: !!service.hoanThanh,
            });
        } else {
            setForm({
                maCongViec: "",
                maNguoiThue: "",
                ngayThue: new Date().toLocaleDateString('vi-VN'),
                hoanThanh: false,
            });
        }
    }, [service]);

    if (!open) return null;

    const handleSubmit = async () => {
        setErrors({});

        const newErrors: any = {};
        if (!form.maCongViec) newErrors.maCongViec = "Mã công việc không được bỏ trống";
        if (!form.maNguoiThue) newErrors.maNguoiThue = "Mã người thuê không được bỏ trống";
        if (!form.ngayThue.trim()) newErrors.ngayThue = "Ngày thuê không được bỏ trống";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const isEdit = !!service;

        try {
            setSubmitting(true);

            const payload = {
                id: isEdit ? service.id : 0,
                maCongViec: Number(form.maCongViec),
                maNguoiThue: Number(form.maNguoiThue),
                ngayThue: form.ngayThue,
                hoanThanh: form.hoanThanh,
            };

            const res = isEdit
                ? await api.put(`thue-cong-viec/${service.id}`, payload)
                : await api.post(`thue-cong-viec`, payload);

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
                        {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}
                    </h2>
                </div>

                {/* Form */}
                <div className="space-y-4 px-6 py-5">
                    {/* maCongViec */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mã công việc</label>
                        <input
                            type="number"
                            value={form.maCongViec}
                            onChange={(e) => setForm({ ...form, maCongViec: e.target.value })}
                            placeholder="Nhập mã công việc"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.maCongViec
                                ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.maCongViec && <p className="text-xs text-red-500">{errors.maCongViec}</p>}
                    </div>

                    {/* maNguoiThue */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mã người thuê</label>
                        <input
                            type="number"
                            value={form.maNguoiThue}
                            onChange={(e) => setForm({ ...form, maNguoiThue: e.target.value })}
                            placeholder="Nhập mã người thuê"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.maNguoiThue
                                ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.maNguoiThue && <p className="text-xs text-red-500">{errors.maNguoiThue}</p>}
                    </div>

                    {/* ngayThue */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Ngày thuê</label>
                        <input
                            value={form.ngayThue}
                            onChange={(e) => setForm({ ...form, ngayThue: e.target.value })}
                            placeholder="DD/MM/YYYY"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.ngayThue
                                ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.ngayThue && <p className="text-xs text-red-500">{errors.ngayThue}</p>}
                    </div>

                    {/* hoanThanh */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="hoanThanh"
                            checked={form.hoanThanh}
                            onChange={(e) => setForm({ ...form, hoanThanh: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="hoanThanh" className="text-sm font-medium text-slate-600">
                            Hoàn thành
                        </label>
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
