"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  page: number;
  keyword: string;
  totalPages: number;
};

export default function JobPagination({ page, keyword, totalPages }: Props) {
  const router = useRouter();
  const [inputPage, setInputPage] = useState("");

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;

    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    params.set("page", String(p));

    router.push(`/Admin/job?${params.toString()}`);
  };

  const handleJumpPage = () => {
    const p = Number(inputPage);
    if (!p) return;
    goToPage(p);
    setInputPage("");
  };

  return (
    <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Hiển thị trang */}
      <span className="text-sm text-gray-500">
        Hiển thị trang {page} / {totalPages}
      </span>

      {/* Đi tới trang */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Đi tới trang</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJumpPage()}
          placeholder="VD: 10"
          className="w-20 rounded-lg border px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleJumpPage}
          className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          Đi
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="rounded-lg border px-3 py-1 text-sm font-medium
                     transition hover:bg-gray-50
                     disabled:cursor-not-allowed disabled:opacity-50"
        >
          Trước
        </button>

        {/* Page numbers */}
        {(() => {
          let startPage = Math.max(1, page - 2);
          let endPage = Math.min(totalPages, startPage + 4);

          if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
          }

          const pages = [];
          for (let p = startPage; p <= endPage; p++) {
            pages.push(p);
          }

          return pages.map((p) => {
            const active = p === page;
            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            );
          });
        })()}

        {/* Next */}
        <button
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          className="rounded-lg border px-3 py-1 text-sm font-medium
                     transition hover:bg-gray-50
                     disabled:cursor-not-allowed disabled:opacity-50"
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
}
