"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "@/app/services/api";
import {
    faUser,
    faEnvelope,
    faLock,
    faKey,
    faPhone,
    faVenusMars,
    faEye,
    faEyeSlash,
    faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import RegisterImg from "@/public/img/signup.jpg";

interface RegisterModalProps {
    onClose: () => void;
    onSwitchLogin: () => void;
    onRegisterSuccess: () => void;
}

interface RegisterForm {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
}

interface RegisterErrors {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    phone?: string;
    birthday?: string;
    form?: string;
}

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
const phoneRegex = /^[0-9]{9,11}$/;
const nameRegex = /^([^0-9]*)$/;

const RegisterModal = ({
    onClose,
    onSwitchLogin,
    onRegisterSuccess,
}: RegisterModalProps) => {
    const [register, setRegister] = useState<RegisterForm>({
        id: 0,
        name: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        gender: true,
        role: "USER",
    });

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: RegisterErrors = {};

        if (!register.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (!nameRegex.test(register.name)) {
            newErrors.name = "Full name cannot contain numbers";
        }

        if (!register.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(register.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!register.password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(register.password)) {
            newErrors.password = "Password must be at least 6 characters and contain both letters and numbers";
        }

        if (register.password !== passwordConfirm) {
            newErrors.passwordConfirm = "Password Confirm not matching password above!";
        }

        if (!register.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!phoneRegex.test(register.phone)) {
            newErrors.phone = "Phone must have 9-11 number";
        }

        if (!register.birthday) {
            newErrors.birthday = "Birthday is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "passwordConfirm") {
            setPasswordConfirm(value);
        } else {
            setRegister((prev) => ({
                ...prev,
                [name]: name === "gender" ? value === "true" : value,
            }));
        }

        if (errors[name as keyof RegisterErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await api.post("auth/signup", register);
            onRegisterSuccess();
        } catch (error: any) {
            setErrors({
                form: "Email has already, Please login to continue",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full lg:w-[80%] xl:w-[70%] bg-amber-200 rounded-2xl p-6 sm:p-8 md:p-10 relative shadow-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute right-6 top-12 text-gray-600 hover:text-red-600 transition cursor-pointer"
            >
                <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-6 text-center text-orange-800">
                        Register
                    </h3>

                    {errors.form && (
                        <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                            {errors.form}{" "}
                            <span onClick={onSwitchLogin} className="font-semibold underline cursor-pointer">
                                Login Here
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="name"
                                value={register.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}

                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="email"
                                type="email"
                                value={register.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}

                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={register.password}
                                onChange={handleChange}
                                placeholder="Your Password"
                                className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}

                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faKey}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="passwordConfirm"
                                type={showPasswordConfirm ? "text" : "password"}
                                value={passwordConfirm}
                                onChange={handleChange}
                                placeholder="Repeat your password"
                                className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.passwordConfirm ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                            <FontAwesomeIcon
                                icon={showPasswordConfirm ? faEyeSlash : faEye}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            />
                        </div>
                        {errors.passwordConfirm && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.passwordConfirm}
                            </p>
                        )}

                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="phone"
                                value={register.phone}
                                onChange={handleChange}
                                placeholder="Your Phone"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}

                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faBirthdayCake}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="birthday"
                                type="date"
                                value={register.birthday}
                                onChange={handleChange}
                                placeholder="mm/dd/yyyy"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.birthday ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 outline-none text-gray-800`}
                            />
                        </div>
                        {errors.birthday && (
                            <p className="text-xs text-red-500 mt-1">{errors.birthday}</p>
                        )}

                        <div className="relative flex items-center">
                            <FontAwesomeIcon
                                icon={faVenusMars}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <div className="pl-10 w-full flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="true"
                                        checked={register.gender === true}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-700">Male</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="false"
                                        checked={register.gender === false}
                                        onChange={handleChange}
                                        className="form-radio h-4 w-4 text-pink-600"
                                    />
                                    <span className="ml-2 text-gray-700">Female</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-60"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4 text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={onSwitchLogin}
                            className="font-semibold cursor-pointer hover:underline text-blue-600"
                        >
                            Login
                        </span>
                    </p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                    <Image
                        src={RegisterImg}
                        alt="Register Illustration"
                        width={500}
                        height={500}
                        className="rounded-lg mix-blend-multiply"
                    />
                </div>
            </div>
        </div>
    );
};
export default RegisterModal;
