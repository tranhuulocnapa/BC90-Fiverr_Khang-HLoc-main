"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    open: boolean;
    job?: any;
    onClose: () => void;
};

export default function JobModal({ open, job, onClose }: Props) {
    const router = useRouter();
    const initialForm = {
        tenCongViec: "",
        moTa: "",
        moTaNgan: "",
        giaTien: "",
        danhGia: "",
        maChiTietLoaiCongViec: "",
        hinhAnh: "",
        saoCongViec: "",
    };


    const [form, setForm] = useState({
        tenCongViec: "",
        moTa: "",
        moTaNgan: "",
        giaTien: "",
        danhGia: "",
        maChiTietLoaiCongViec: "",
        hinhAnh: "",
        saoCongViec: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (job) {
            setForm({
                tenCongViec: job.tenCongViec ?? "",
                moTa: job.moTa ?? "",
                moTaNgan: job.moTaNgan ?? "",
                giaTien: (job.giaTien ?? "") + "",
                danhGia: (job.danhGia ?? "") + "",
                maChiTietLoaiCongViec: (job.maChiTietLoaiCongViec ?? "") + "",
                hinhAnh: job.hinhAnh ?? "",
                saoCongViec: (job.saoCongViec ?? "") + "",
            });
        } else {
            setForm({
                tenCongViec: "",
                moTa: "",
                moTaNgan: "",
                giaTien: "",
                danhGia: "",
                maChiTietLoaiCongViec: "",
                hinhAnh: "",
                saoCongViec: "",
            });
        }
    }, [job]);

    if (!open) return null;

    const handleSubmit = async () => {
        setErrors({});

        const admin = typeof window !== 'undefined' ? localStorage.getItem('USER_ADMIN') : null;
        if (!admin) {
            toast.error('Bạn cần đăng nhập để thực hiện thao tác này');
            router.push('/Admin/login');
            return;
        }

        const newErrors: any = {};
        if (!form.tenCongViec.trim()) newErrors.tenCongViec = "Tiêu đề không được bỏ trống";
        if (!form.giaTien || isNaN(Number(form.giaTien))) newErrors.giaTien = "Giá phải là số";
        if (!form.maChiTietLoaiCongViec.trim()) newErrors.maChiTietLoaiCongViec = "Mã loại công việc không được bỏ trống";
        if (!form.hinhAnh.trim()) newErrors.hinhAnh = "Hình ảnh không được bỏ trống";
        if (!form.moTa.trim()) newErrors.moTa = "Mô tả không được bỏ trống";
        if (!form.moTaNgan.trim()) newErrors.moTaNgan = "Mô tả ngắn không được bỏ trống";
        if (!form.danhGia.trim()) newErrors.danhGia = "Đánh giá không được bỏ trống";
        if (!form.saoCongViec.trim()) newErrors.saoCongViec = "Số sao không được bỏ trống";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const isEdit = !!job;

        try {
            setSubmitting(true);

            const userAdminRaw = typeof window !== 'undefined' ? localStorage.getItem('USER_ADMIN') : null;
            const userAdmin = userAdminRaw ? JSON.parse(userAdminRaw) : null;

            const adminUser = userAdmin?.user || userAdmin?.content?.user || userAdmin;
            const userId = adminUser?.id || 0;

            const payload: any = {
                tenCongViec: form.tenCongViec,
                moTa: form.moTa,
                moTaNgan: form.moTaNgan,
                giaTien: Number(form.giaTien),
                danhGia: Number(form.danhGia) || 0,
                maChiTietLoaiCongViec: Number(form.maChiTietLoaiCongViec) || 0,
                hinhAnh: form.hinhAnh,
                saoCongViec: Number(form.saoCongViec) || 0,
                nguoiTao: userId,
            };

            if (isEdit) {
                payload.id = job?.id;
            }

            const res = isEdit
                ? await api.put(`cong-viec/${job?.id}`, payload)
                : await api.post(`cong-viec`, payload);

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
                    <h2 className="text-lg font-semibold text-slate-800">{job ? "Chỉnh sửa công việc" : "Thêm công việc"}</h2>
                </div>

                {/* Form */}
                <div className="space-y-4 px-6 py-5">

                    {/* Title */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Tiêu đề</label>
                        <input
                            value={form.tenCongViec}
                            onChange={(e) => setForm({ ...form, tenCongViec: e.target.value })}
                            placeholder="Tiêu đề"
                            aria-invalid={!!errors.tenCongViec}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.tenCongViec ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'}`}
                        />
                        {errors.tenCongViec && <p className="text-xs text-red-500">{errors.tenCongViec}</p>}
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Giá</label>
                        <input
                            value={form.giaTien}
                            onChange={(e) => setForm({ ...form, giaTien: e.target.value })}
                            placeholder="Giá"
                            aria-invalid={!!errors.giaTien}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.giaTien ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'}`}
                        />
                        {errors.giaTien && <p className="text-xs text-red-500">{errors.giaTien}</p>}
                    </div>

                    {/* Category id */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mã chi tiết loại</label>
                        <input
                            value={form.maChiTietLoaiCongViec}
                            onChange={(e) => setForm({ ...form, maChiTietLoaiCongViec: e.target.value })}
                            placeholder="Mã chi tiết loại"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />
                        {errors.maChiTietLoaiCongViec && <p className="text-xs text-red-500">{errors.maChiTietLoaiCongViec}</p>}
                    </div>

                    {/* Image */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">URL hình ảnh</label>
                        <input
                            value={form.hinhAnh}
                            onChange={(e) => setForm({ ...form, hinhAnh: e.target.value })}
                            placeholder="URL hình ảnh"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />
                        {errors.hinhAnh && <p className="text-xs text-red-500">{errors.hinhAnh}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mô tả</label>
                        <textarea
                            value={form.moTa}
                            onChange={(e) => setForm({ ...form, moTa: e.target.value })}
                            placeholder="Mô tả"
                            aria-invalid={!!errors.moTa}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.moTa ? 'border-red-500 focus:ring-2 focus:ring-red-500/30' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'}`}
                        />
                        {errors.moTa && <p className="text-xs text-red-500">{errors.moTa}</p>}
                    </div>

                    {/* Short desc */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mô tả ngắn</label>
                        <input
                            value={form.moTaNgan}
                            onChange={(e) => setForm({ ...form, moTaNgan: e.target.value })}
                            placeholder="Mô tả ngắn"
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        />
                        {errors.moTaNgan && <p className="text-xs text-red-500">{errors.moTaNgan}</p>}
                    </div>

                    {/* Ratings & stars */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600 leading-4 text-left">Đánh giá</label>
                            <input
                                value={form.danhGia}
                                onChange={(e) => setForm({ ...form, danhGia: e.target.value })}
                                placeholder="Đánh giá"
                                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.danhGia && <p className="text-xs text-red-500">{errors.danhGia}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600 leading-4 text-left">Sao</label>
                            <input
                                value={form.saoCongViec}
                                onChange={(e) => setForm({ ...form, saoCongViec: e.target.value })}
                                placeholder="Số sao"
                                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                            />
                            {errors.saoCongViec && <p className="text-xs text-red-500">{errors.saoCongViec}</p>}
                        </div>
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
                        aria-busy={submitting}
                        className={`rounded-lg px-5 py-2 text-sm font-medium text-white transition
                    ${submitting
                                ? "cursor-not-allowed bg-slate-400"
                                : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30"}
                `}
                    >
                        {submitting ? "Đang lưu..." : "Lưu"}
                    </button>
                </div>

            </div>
        </div>
    );
}
