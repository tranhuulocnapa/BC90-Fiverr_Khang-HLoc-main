"use client";
import { useEffect, useState } from "react";
import { getJobMenu } from "@/app/services/job";
import Link from "next/link";

export default function StickyNav({ headerHeight }: { headerHeight: number }) {
    const [visible, setVisible] = useState(false);
    const [titles, setTitles] = useState<any[]>([]);
    const [hoveredTitle, setHoveredTitle] = useState<number | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menuData = await getJobMenu();
                setTitles(menuData.content);
            } catch (error) {
                console.error("Failed to fetch job menu:", error);
            }
        };
        fetchMenu();
        const handleScroll = () => {
            const heroSection = document.getElementById("hero-section");
            if (heroSection) {
                if (window.scrollY > heroSection.offsetHeight) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        };

        const handleHide = () => setVisible(false);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hideStickyNav", handleHide);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hideStickyNav", handleHide);
        };
    }, []);

    return (
        <div
            className={`fixed left-0 w-full bg-orange-400 z-40 shadow-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
                }`}
            style={{ top: `${headerHeight}px` }}
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-16">
                    <div className="flex space-x-8">
                        {titles.map((title) => (
                            <div
                                key={title.id}
                                className="relative"
                                onMouseEnter={() => setHoveredTitle(title.id)}
                                onMouseLeave={() => setHoveredTitle(null)}
                            >
                                <Link
                                    href={`/Title?id=${title.id}`}
                                    className="text-gray-600 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {title.tenLoaiCongViec}
                                </Link>
                                {hoveredTitle === title.id &&
                                    title.dsNhomChiTietLoai.length > 0 && (
                                        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                {title.dsNhomChiTietLoai.flatMap((sub: any) => [
                                                    <Link
                                                        key={`sub-${sub.id}`}
                                                        href={`/Title?id=${title.id}#${sub.id}`}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-500"
                                                    >
                                                        {sub.tenNhom}
                                                    </Link>,
                                                    ...sub.dsChiTietLoai.map((detail: any) => (
                                                        <Link
                                                            key={`detail-${sub.id}-${detail.id}`}
                                                            href={`/Categories?id=${detail.id}`}
                                                            className="block pl-8 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-500"
                                                            role="menuitem"
                                                        >
                                                            {detail.tenChiTiet}
                                                        </Link>
                                                    )),
                                                ])}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
