"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import JobModal from "./JobModal";

export default function JobHeader() {
    function normalizeVietnamese(text: string) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s]/g, "")
            .trim();
    }

    const [open, setOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const keywordFromUrl = searchParams.get("keyword") || "";
    const [keyword, setKeyword] = useState(keywordFromUrl);

    useEffect(() => {
        setKeyword(keywordFromUrl);
    }, [keywordFromUrl]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            const normalized = normalizeVietnamese(keyword);

            if (normalized) {
                params.set("keyword", normalized);
            } else {
                params.delete("keyword");
            }

            params.set("page", "1");
            router.replace(`?${params.toString()}`);
        }, 400);

        return () => clearTimeout(timer);
    }, [keyword]);

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow sm:flex-row sm:items-center sm:justify-between">
            {/* LEFT */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Quản lý công việc</h2>
                <p className="text-sm text-gray-500">Danh sách, tìm kiếm và quản lý công việc</p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* SEARCH */}
                <div className="relative">
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Tìm tên công việc hoặc mô tả..."
                        className="w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {keyword && (
                        <button
                            onClick={() => setKeyword("")}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* ADD JOB */}
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm
            font-medium text-white transition hover:bg-green-700 active:scale-95"
                >
                    + Thêm công việc
                </button>
            </div>

            <JobModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
