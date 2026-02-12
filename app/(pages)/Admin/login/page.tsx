"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const getCookie = (name: string): string | undefined => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    return decodeURIComponent(cookie.substring(name.length + 1));
                }
            }
            return undefined;
        };

        const rememberedEmail = getCookie('remembered_email');
        const rememberedPassword = getCookie('remembered_password');

        if (rememberedEmail) {
            setEmail(rememberedEmail);
            if (rememberedPassword) {
                setPassword(rememberedPassword);
            }
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("auth/signin", { email, password });

            if (res.status !== 200) {
                toast.error(res.data?.content || "Đăng nhập thất bại");
                return;
            }

            const raw = res?.data || {};

            const token = raw?.token || raw?.accessToken || raw?.content?.token || raw?.content?.accessToken || raw?.content?.data?.token || "";

            if (!token) {
                toast.error("Không lấy được token đăng nhập");
                return;
            }

            if (raw?.content?.user?.role !== "ADMIN") {
                toast.error("Bạn không có quyền truy cập");
                return;
            }

            const store = {
                ...raw,
                accessToken: token,
                token: token,
            };

            if (rememberMe) {
                document.cookie = `remembered_email=${encodeURIComponent(
                    email
                )}; path=/`;
                document.cookie = `remembered_password=${encodeURIComponent(
                    password
                )}; path=/`;
            } else {
                document.cookie =
                    "remembered_email=; max-age=0; path=/";
                document.cookie =
                    "remembered_password=; max-age=0; path=/";
            }

            localStorage.setItem("USER_ADMIN", JSON.stringify(store));

            window.dispatchEvent(new Event("adminAuthChanged"));
            toast.success("Đăng nhập admin thành công");
            router.push("/Admin");

        } catch (error: any) {
            toast.error(error?.response?.data?.content || "Lỗi server");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 p-8 text-white backdrop-blur-lg">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold">Login Admin</h2>
                    <p className="mt-2 text-white/80">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border-none bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border-none bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/60 hover:text-white"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 bg-white/20 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-white/80"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white transition-opacity
                                ${loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:opacity-90"
                            }`}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
