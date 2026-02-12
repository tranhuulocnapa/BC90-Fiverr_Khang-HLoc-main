import JobServiceActions from "./JobServiceActions";
import JobServicePagination from "./JobServicePagination";

type Props = {
    keyword: string;
    page: number;
};

export default async function JobServiceTable({ keyword, page }: Props) {
    const pageSize = 10;

    const res = await fetch(
        `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec`,
        {
            headers: {
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
            },
            cache: "no-store",
        }
    );

    const result = await res.json();
    let services: any[] = result.content || result || [];

    // Filter by keyword (check maCongViec or maNguoiThue)
    const normalizedKeyword = (keyword || "").toLowerCase().trim();
    const filtered = normalizedKeyword
        ? services.filter((s) => {
            const mc = (s.maCongViec ?? "").toString().toLowerCase();
            const mn = (s.maNguoiThue ?? "").toString().toLowerCase();
            return mc.includes(normalizedKeyword) || mn.includes(normalizedKeyword);
        })
        : services;

    const totalRow = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRow / pageSize));

    const start = (page - 1) * pageSize;
    const pageServices = filtered.slice(start, start + pageSize);

    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left w-20">ID</th>
                            <th className="px-6 py-3 text-left">Mã công việc</th>
                            <th className="px-6 py-3 text-left">Mã người thuê</th>
                            <th className="px-6 py-3 text-left">Ngày thuê</th>
                            <th className="px-6 py-3 text-left">Trạng thái</th>
                            <th className="px-6 py-3 text-center w-32">Hành động</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y text-left">
                        {pageServices.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    Không tìm thấy dịch vụ
                                </td>
                            </tr>
                        )}

                        {pageServices.map((s: any) => (
                            <tr key={s.id}>
                                <td className="px-6 py-4">{s.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{s.maCongViec}</td>
                                <td className="px-6 py-4">{s.maNguoiThue}</td>
                                <td className="px-6 py-4">{s.ngayThue}</td>
                                <td className="px-6 py-4">
                                    {s.hoanThanh ? (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                            Hoàn thành
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                            Chưa hoàn thành
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <JobServiceActions serviceId={s.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <JobServicePagination page={page} keyword={keyword} totalPages={totalPages} />
        </>
    );
}
