"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    ClipboardList,
    Settings,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

const menu = [
    {
        label: "Dashboard",
        href: "/Admin",
        icon: <LayoutDashboard size={20} />,
    },
    {
        label: "Quản lý người dùng",
        href: "/Admin/User",
        icon: <Users size={20} />,
    },
    {
        label: "Quản lý Công việc",
        href: "/Admin/job",
        icon: <Briefcase size={20} />,
    },
    {
        label: "Quản lý Loại công việc",
        href: "/Admin/jobtype",
        icon: <ClipboardList size={20} />,
    },
    {
        label: "Quản lý dịch vụ",
        href: "/Admin/jobservice",
        icon: <Settings size={20} />,
    },
];

export default function Sidebar({
    isCollapsed,
    isMobile,
}: {
    isCollapsed: boolean;
    isMobile: boolean;
}) {
    const pathname = usePathname();

    return (
        <aside
            className={`fixed left-0 top-0 z-20 flex h-screen flex-col bg-slate-900 text-slate-100 shadow-2xl transition-all duration-300
                ${isMobile
                    ? isCollapsed
                        ? "-translate-x-full"
                        : "translate-x-0"
                    : isCollapsed
                        ? "w-20"
                        : "w-64"
                }
            `}
        >
            <div className="flex items-center justify-between border-b border-publer-blue px-6 py-5">
                {!isCollapsed && (
                    <div className="text-xl font-bold tracking-wide text-blue-400">
                        Fiverr Admin
                    </div>
                )}
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {menu.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                                ${active
                                    ? "bg-publer-blue text-white"
                                    : "text-slate-300 hover:bg-publer-blue hover:text-white"
                                }
                                ${isCollapsed ? "justify-center" : ""}
                            `}
                        >
                            {item.icon}
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div
                className={`border-t border-publer-blue px-4 py-3 text-center text-xs text-slate-400
                    ${isCollapsed ? "hidden" : ""}
                `}
            >
                © 2026 Fiverr Admin
            </div>
        </aside>
    );
}
