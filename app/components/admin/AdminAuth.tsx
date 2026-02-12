"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
}

interface AdminAuthContextType {
    user: User | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}

export default function AdminAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pathname === "/Admin/login") {
            setLoading(false);
            return;
        }

        const stored = localStorage.getItem("USER_ADMIN");
        if (!stored) {
            router.push("/Admin/login");
            return;
        }

        try {
            const parsedData = JSON.parse(stored);
            setUser(parsedData.user);
        } catch (error) {
            console.error("Failed to parse user data from local storage", error);
            router.push("/Admin/login");
        } finally {
            setLoading(false);
        }
    }, [pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <AdminAuthContext.Provider value={{ user }}>
            {children}
        </AdminAuthContext.Provider>
    );
}
