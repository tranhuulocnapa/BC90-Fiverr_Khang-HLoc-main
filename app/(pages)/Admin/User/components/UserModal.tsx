"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/services/api";

type Props = {
    open: boolean;
    user?: any;
    onClose: () => void;
};

export default function UserModal({ open, user, onClose }: Props) {
    const router = useRouter();

    const initialForm = {
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: 0,
        role: "USER",
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: 0,
        role: "USER",
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; password?: string; role?: string; gender?: boolean }>({});

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                password: "",
                gender: user.gender ? 0 : 1,
                role: user.role ?? "USER",
            });
        } else {
            setForm({ name: "", email: "", phone: "", password: "", gender: 0, role: "USER" });
        }
    }, [user]);

    if (!open) return null;

    const handleSubmit = async () => {

        setErrors({});

        const isEdit = !!user;

        const newErrors: { name?: string; email?: string; phone?: string; password?: string; gender?: boolean } = {};
        if (!form.name.trim()) {
            newErrors.name = "Tên không được bỏ trống";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        const digits = form.phone.replace(/\D/g, "");
        if (!digits || digits.length < 9) {
            newErrors.phone = "Số điện thoại không hợp lệ (ít nhất 9 chữ số)";
        }

        if (!isEdit && !form.password.trim()) {
            newErrors.password = "Mật khẩu không được bỏ trống";
        }
        if (form.password && form.password.length > 0 && form.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }
        if (form.gender !== 0 && form.gender !== 1) {
            newErrors.gender = true;
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);

            const payload: any = {
                id: isEdit ? user?.id : 0,
                name: form.name,
                email: form.email,
                phone: form.phone,
                birthday: user?.birthday,
                gender: form.gender === 0,
                role: form.role,
                skill: user?.skill || [],
                certification: user?.certification || [],
            };

            if (!isEdit || (form.password && form.password.trim())) {
                payload.password = form.password;
            }

            const res = isEdit
                ? await api.put(`users/${user?.id}`, payload)
                : await api.post(`users`, payload);

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
                        {user ? "Chỉnh sửa Người dùng" : "Thêm Người dùng"}
                    </h2>
                </div>

                {/* Form */}
                <div className="space-y-4 px-6 py-5">

                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Tên</label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Nhập tên"
                            aria-invalid={!!errors.name}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.name
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Email</label>
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="example@email.com"
                            aria-invalid={!!errors.email}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.email
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Role */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Role</label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.role
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Mật khẩu</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder={user ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
                            aria-invalid={!!errors.password}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.password
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Số điện thoại</label>
                        <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="0123 456 789"
                            aria-invalid={!!errors.phone}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.phone
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>
                    {/* Gender */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600 leading-4 text-left">Giới tính</label>
                        <select
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: Number(e.target.value) })}
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                        ${errors.gender
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                                }`}
                        >
                            <option value={0}>Nam</option>
                            <option value={1}>Nữ</option>
                        </select>
                        {errors.gender && <p className="text-xs text-red-500">Giới tính không hợp lệ</p>}
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
