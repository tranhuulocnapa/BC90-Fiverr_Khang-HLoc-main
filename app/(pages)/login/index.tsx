"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faUser,
    faLock,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import api from "@/app/services/api";
import LoginImage from "@/public/img/signin.jpg"

interface LoginModalProps {
    onClose: () => void;
    onSwitchRegister: () => void;
    onLoginSuccess: (userData: any) => void;
}

interface LoginData {
    email: string;
    password: string;
}

interface LoginErrors {
    email?: string;
    password?: string;
    form?: string;
}

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^.{6,}$/;

const LoginModal = ({
    onClose,
    onSwitchRegister,
    onLoginSuccess,
}: LoginModalProps) => {
    const [login, setLogin] = useState<LoginData>({ email: "", password: "" });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: LoginErrors = {};
        if (!login.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(login.email)) newErrors.email = "Invalid email format";

        if (!login.password.trim()) newErrors.password = "Password is required";
        else if (!passwordRegex.test(login.password)) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            setErrors({});
            const response = await api.post("auth/signin", login);
            localStorage.setItem("USER_LOGIN", JSON.stringify(response.data));
            window.dispatchEvent(new Event("USER_LOGIN_SUCCESS"));
            onLoginSuccess(response.data);
        } catch (error: any) {
            alert("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full max-w-[92%] sm:max-w-md md:max-w-4xl lg:max-w-4xl xl:max-w-4xl bg-amber-200 rounded-2xl 
            p-5 sm:p-6 md:p-8 lg:p-8 xl:p-10 relative shadow-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="hidden md:block">
                    <Image
                        src={LoginImage}
                        alt="Login"
                        width={500}
                        height={500}
                        className="rounded-2xl object-cover w-full h-full mix-blend-multiply"
                    />
                </div>

                <div>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-[#272B45] hover:text-red-600 transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>

                    <h3 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-orange-800">
                        Login
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={login.email}
                                    onChange={(e) => {
                                        setLogin({ ...login, email: e.target.value });
                                        setErrors({ ...errors, email: undefined, form: undefined });
                                    }}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B99333] text-[#272B45]"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Your Password"
                                    value={login.password}
                                    onChange={(e) => {
                                        setLogin({ ...login, password: e.target.value });
                                        setErrors({ ...errors, password: undefined, form: undefined });
                                    }}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B99333] text-[#272B45]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {errors.form && (
                            <p className="text-sm text-red-600 text-center">{errors.form}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-[#B99333] text-white font-semibold hover:bg-[#a37f2c] transition cursor-pointer disabled:opacity-70"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="flex flex-col md:flex-col lg:flex-row gap-3 my-6">
                        <button className="w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2  bg-white text-[#DB4437] hover:bg-[#DB4437] hover:text-white transition cursor-pointer">
                            <FontAwesomeIcon icon={faGoogle} />
                            Google
                        </button>

                        <button
                            className="w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 
                    bg-white text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                            Facebook
                        </button>
                    </div>

                    <p className="text-center text-sm sm:text-base text-[#272B45]">
                        Don't have an account?{" "}
                        <span
                            onClick={onSwitchRegister}
                            className="font-semibold cursor-pointer hover:underline text-[#B99333]"
                        >
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;
