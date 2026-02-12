import JobTypeActions from "./JobTypeActions";
import JobTypePagination from "./JobTypePagination";

type Props = {
    keyword: string;
    page: number;
};

export default async function JobTypeTable({ keyword, page }: Props) {
    const pageSize = 10;

    const res = await fetch(
        `https://fiverrnew.cybersoft.edu.vn/api/loai-cong-viec`,
        {
            headers: {
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
            },
            cache: "no-store",
        }
    );

    const result = await res.json();
    let jobTypes: any[] = result.content || result || [];

    // Filter by keyword
    const normalizedKeyword = (keyword || "").toLowerCase().trim();
    const filtered = normalizedKeyword
        ? jobTypes.filter((jt) => jt.tenLoaiCongViec?.toLowerCase().includes(normalizedKeyword))
        : jobTypes;

    const totalRow = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRow / pageSize));

    const start = (page - 1) * pageSize;
    const pageJobTypes = filtered.slice(start, start + pageSize);

    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left w-20">ID</th>
                            <th className="px-6 py-3 text-left">Tên loại công việc</th>
                            <th className="px-6 py-3 text-center w-32">Hành động</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y text-left">
                        {pageJobTypes.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    Không tìm thấy loại công việc
                                </td>
                            </tr>
                        )}

                        {pageJobTypes.map((jt: any) => (
                            <tr key={jt.id}>
                                <td className="px-6 py-4">{jt.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{jt.tenLoaiCongViec}</td>
                                <td className="px-6 py-4 text-center">
                                    <JobTypeActions jobTypeId={jt.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <JobTypePagination page={page} keyword={keyword} totalPages={totalPages} />
        </>
    );
}
