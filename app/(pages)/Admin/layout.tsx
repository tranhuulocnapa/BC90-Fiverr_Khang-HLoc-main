"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import AdminAuth, { useAdminAuth } from "@/app/components/admin/AdminAuth";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import AdminHeader from "@/app/components/AdminHeader";
import { useState, useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const auth = useAdminAuth();
    const userName = auth?.user?.name || "Admin";

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex min-h-screen bg-publer-light-gray">
            <Sidebar isCollapsed={isSidebarCollapsed} isMobile={isMobile} />
            <div
                className={`flex-1 transition-all duration-300 ${isMobile
                        ? "ml-0"
                        : isSidebarCollapsed
                            ? "ml-20"
                            : "ml-64"
                    }`}
            >
                <AdminHeader
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
                <main className="p-8">{children}</main>
            </div>
            {isMobile && !isSidebarCollapsed && (
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/Admin/login";

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-publer-light-gray">
                <AdminAuth>{children}</AdminAuth>
                <Toaster richColors position="top-right" />
            </div>
        );
    }

    return (
        <AdminAuth>
            <AdminLayoutContent>{children}</AdminLayoutContent>
            <Toaster richColors position="top-right" />
        </AdminAuth>
    );
}
