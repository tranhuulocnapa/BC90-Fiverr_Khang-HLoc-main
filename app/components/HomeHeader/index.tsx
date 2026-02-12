"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faRightFromBracket,
    faCheckCircle,
    faBars,
    faTimes,
    faSearch,
    faGlobe,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "@/app/(pages)/login";
import RegisterModal from "@/app/(pages)/register";
import { getJobsByName } from "@/app/services/job";
import { TJob } from "@/app/types";

interface HeaderProps {
    isHome?: boolean;
    homeAnimationDone?: boolean;
    onStickyChange?: (isSticky: boolean) => void;
}

const HomeHeader = ({
    isHome = false,
    homeAnimationDone = false,
    onStickyChange,
}: HeaderProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const [showBg, setShowBg] = useState(!isHome);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
    const [userLogin, setUserLogin] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<TJob[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Xử lý đóng dropdown khi bấm ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("USER_LOGIN");
        if (storedUser) setUserLogin(JSON.parse(storedUser));
    }, []);

    useEffect(() => {
        if (!isHome) return;
        const onScroll = () => {
            const isSticky = window.scrollY > 50;
            setShowBg(isSticky);
            if (onStickyChange) {
                onStickyChange(isSticky);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome, onStickyChange]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (searchTerm) {
                try {
                    const response = await getJobsByName(searchTerm);
                    if (response.content) {
                        setSuggestions(response.content);
                        setShowSuggestions(true);
                    }
                } catch (error) {
                    console.error("Failed to fetch suggestions:", error);
                }
            } else {
                setSuggestions([]);
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/result/${searchTerm}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (name: string) => {
        setSearchTerm(name);
        router.push(`/result/${name}`);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handleOpenModal = (event: any) => {
            const mode = event.detail?.mode || "login";
            setAuthModal(mode);
            setDropdownOpen(false);
            setIsMenuOpen(false);
        };

        window.addEventListener("OPEN_AUTH_MODAL", handleOpenModal);
        return () => window.removeEventListener("OPEN_AUTH_MODAL", handleOpenModal);
    }, []);

    const handleLoginSuccess = (userData: any) => {
        localStorage.setItem("USER_LOGIN", JSON.stringify(userData));
        setUserLogin(userData);
        setAuthModal(null);
        setToastMessage("Logged in successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem("USER_LOGIN");
        setUserLogin(null);
        setDropdownOpen(false);
    };

    const handleRegisterSuccess = () => {
        setAuthModal(null);
        setToastMessage("Registered successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const HeaderContent = (
        <div className="flex items-center justify-between py-4 sm:py-4 md:py-4 lg:py-0">
            {/* Responsive Mode */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-1">
                <button
                    className="lg:hidden p-2 text-gray-700 cursor-pointer hover:bg-black/5 rounded-full transition-colors"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
                <Link href="/" className="lg:hidden cursor-pointer active:scale-95 transition-transform">
                    <img src="/img/Logo.png" className="h-30 sm:h-15 object-contain" alt="Logo" />
                </Link>

                <AnimatePresence mode="wait">
                    {showBg ? (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full lg:hidden"
                        >
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="What service are you looking for today?"
                                    className="w-full pl-12 pr-4 py-3 text-sm bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <FontAwesomeIcon icon={faX} />
                                    </button>
                                )}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                                        {suggestions.map((job) => (
                                            <div
                                                key={job.id}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSuggestionClick(job.congViec.tenCongViec)}
                                            >
                                                {job.congViec.tenCongViec}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="links"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="hidden lg:flex items-center gap-2 xl:gap-6 font-semibold"
                        >
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="hidden lg:flex items-center gap-6">
                <Link href="/" className="cursor-pointer group">
                    <div className="bg-[#C3DFE3] px-10 xl:px-14 py-3 xl:py-4 shadow-md [clip-path:polygon(0%_0%,100%_0%,80%_100%,20%_100%)]">
                        <img src="/img/Logo.png" className="h-10 xl:h-12 mx-auto pointer-events-none" alt="Logo" />
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    <AnimatePresence>
                        {showBg && (
                            <motion.div
                                key="search"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="w-96"
                            >
                                <div className="relative w-full" ref={searchRef}>
                                    <input
                                        type="text"
                                        placeholder="What service are you looking for today?"
                                        className="w-full pl-12 pr-10 py-3 text-sm bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleSearch}
                                        onFocus={() => setShowSuggestions(true)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </button>
                                    )}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                                            {suggestions.map((job) => (
                                                <div
                                                    key={job.id}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSuggestionClick(job.congViec.tenCongViec)}
                                                >
                                                    {job.congViec.tenCongViec}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        key="links"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2 xl:gap-6 font-semibold"
                    >
                        <Link href="#" className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${pathname === "#" ? "bg-black text-white shadow" : "text-gray-700 hover:bg-black/5"}`}>
                            Business
                        </Link>
                        <Link href="#" className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${pathname === "#" ? "bg-black text-white shadow" : "text-gray-700 hover:bg-black/5"
                            }`}>
                            Explore
                        </Link>
                        <Link href="#" className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${pathname === "#" ? "bg-black text-white shadow" : "text-gray-700 hover:bg-black/5"}`}>
                            <FontAwesomeIcon icon={faGlobe} />
                            English
                        </Link>
                        <Link href="/Listing" className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${pathname === "/Listing" ? "bg-black text-white shadow" : "text-gray-700 hover:bg-black/5"}`}>
                            Listing
                        </Link>
                        <Link href="#" className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${pathname === "/seller" ? "bg-black text-white shadow" : "text-gray-700 hover:bg-black/5"}`}>
                            Become a Seller
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 justify-end relative" ref={dropdownRef}>
                {/* Dropdown Login & Logout */}
                <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 
                    bg-white/40 backdrop-blur-md px-2 sm:px-2.5 xl:px-3 py-1 sm:py-1.5 
                        rounded-full border border-white/30 shadow-inner">
                    <AnimatePresence mode="wait">
                        {userLogin ? (
                            <motion.div
                                key="logged-in"
                                initial={{ opacity: 0, x: 4 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 4 }}
                                className="flex items-center"
                            >
                                <span
                                    className="text-[10px] sm:text-xs xl:text-sm font-medium text-gray-700 truncate"
                                    title={userLogin.content.user.name}
                                >
                                    Welcome,&nbsp;
                                    <span className="font-bold text-[#143944] truncate">
                                        {userLogin.content.user.name}
                                    </span>
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="guest"
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 3 }}
                                className="flex items-center max-w-22.5 sm:max-w-35 xl:max-w-none"
                            >
                                <span className="text-[10px] sm:text-xs xl:text-sm font-semibold text-gray-700 truncate">
                                    Sign in to get started
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 
                                    rounded-full overflow-hidden cursor-pointer 
                                    bg-[#143944] text-white 
                                    flex items-center justify-center 
                                    transition-all hover:scale-105 hover:ring-2 ring-offset-2 ring-[#143944] 
                                    shadow-md active:scale-95 shrink-0"
                    >
                        {userLogin ? (
                            <img src={userLogin.avatar || "/img/avatarLogo.jpg"}
                                className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} className="text-[10px] sm:text-xs xl:text-sm" />
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`absolute right-0 top-12 sm:top-14 
                                        ${userLogin ? "w-90 xl:w-72" : "w-44"} 
                                        bg-white/95 backdrop-blur-md 
                                        rounded-2xl shadow-2xl border border-gray-100 z-50 p-4`}
                        >
                            {userLogin ? (
                                userLogin.content.user.role === "ADMIN" ? (
                                    <div className="flex flex-col gap-2 px-2 py-1 text-sm text-gray-700">
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => { setDropdownOpen(false); }}
                                            className="w-full px-4 py-3 text-left cursor-pointer 
                            text-gray-700 hover:bg-amber-600 rounded-xl transition-all font-medium"
                                        >
                                            Go to Admin Page
                                        </Link>

                                        <div className="h-px bg-gray-200 my-2" />

                                        <button onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left cursor-pointer 
                            text-red-500 hover:bg-red-50 rounded-xl 
                            flex items-center gap-3 transition-all font-medium"
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 px-2 py-1 text-sm text-gray-700">
                                        <button onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left cursor-pointer 
                            text-red-500 hover:bg-red-50 rounded-xl 
                            flex items-center gap-3 transition-all font-medium"
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            Logout
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => { setAuthModal("login"); setDropdownOpen(false); }}
                                        className="w-full px-4 py-3 text-left cursor-pointer text-gray-700 hover:bg-amber-600 rounded-xl transition-all font-medium text-sm">
                                        Sign In
                                    </button>

                                    <button onClick={() => { setAuthModal("register"); setDropdownOpen(false); }}
                                        className="w-full px-4 py-3 text-left cursor-pointer 
                        text-gray-700 hover:bg-amber-600 rounded-xl transition-all font-medium text-sm"
                                    >
                                        Join</button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Dropdown Login & Logout */}
            </div>
        </div>
    );

    return (
        <>
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <div className="fixed top-[5%] left-0 w-full flex justify-center z-102 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="bg-[#143944] text-white px-8 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 pointer-events-auto"
                        >
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                            <span className="font-semibold tracking-wide text-sm">
                                {toastMessage}
                            </span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Responsive */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-70 sm:w-[320px] 
    bg-white z-101 shadow-2xl p-6 lg:hidden"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <img src="/img/Logo.png" className="h-15" alt="Logo" />
                                <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-gray-400 cursor-pointer p-2 hover:text-black">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <Link
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`p-4 rounded-2xl font-semibold text-lg cursor-pointer transition-colors ${pathname === "#" ? "bg-[#C3DFE3] text-[#143944]" : "text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Business
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`p-4 rounded-2xl font-semibold text-lg cursor-pointer transition-colors ${pathname === "#" ? "bg-[#C3DFE3] text-[#143944]" : "text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Explore
                                </Link>
                                <Link
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`p-4 rounded-2xl font-semibold text-lg cursor-pointer transition-colors ${pathname === "#" ? "bg-[#C3DFE3] text-[#143944]" : "text-gray-700 hover:bg-gray-50"}`}
                                >
                                    <FontAwesomeIcon icon={faGlobe} /> English
                                </Link>
                                <Link
                                    href="/listing"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`p-4 rounded-2xl font-semibold text-lg cursor-pointer transition-colors ${pathname === "#" ? "bg-[#C3DFE3] text-[#143944]" : "text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Listing
                                </Link>

                                <Link
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`p-4 rounded-2xl font-semibold text-lg cursor-pointer transition-colors ${pathname === "/seller" ? "bg-[#C3DFE3] text-[#143944]" : "text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Become a Seller
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Header */}
            {isHome ? (
                <AnimatePresence>
                    {homeAnimationDone && (
                        <motion.header
                            initial={{ y: -60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 rounded-b-2xl sm:rounded-b-3xl lg:rounded-b-4xl xl:rounded-b-[2.5rem] ${showBg ? "bg-[#C3DFE3] shadow-md" : "bg-white/30 backdrop-blur-sm"
                                }`}
                        >
                            <div className="app-container mx-auto">
                                {HeaderContent}
                            </div>
                        </motion.header>
                    )}
                </AnimatePresence>
            ) : (
                <header className="sticky top-0 z-50 bg-[#C3DFE3] shadow-md rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl xl:rounded-b-4xl">
                    <div className="app-container mx-auto">
                        {HeaderContent}
                    </div>
                </header>
            )}

            {/* Auth Modals */}
            <AnimatePresence>
                {authModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-102 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setAuthModal(null)}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="app-container mx-auto">
                            {authModal === "login" && (
                                <LoginModal onClose={() => setAuthModal(null)}
                                    onSwitchRegister={() => setAuthModal("register")}
                                    onLoginSuccess={handleLoginSuccess} />
                            )}
                            {authModal === "register" && (
                                <RegisterModal
                                    onClose={() => setAuthModal(null)}
                                    onSwitchLogin={() => setAuthModal("login")}
                                    onRegisterSuccess={handleRegisterSuccess}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default HomeHeader;
