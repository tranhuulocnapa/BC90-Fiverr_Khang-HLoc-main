import Pagination from "./Pagination";
import UserActions from "./UserActions";

type Props = {
    keyword: string;
    page: number;
    onTotalPages?: (total: number) => void;
};

export default async function UserTable({ keyword, page }: Props) {
    const pageSize = 10;

    const res = await fetch(
        `https://fiverrnew.cybersoft.edu.vn/api/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}&keyword=${keyword}`,
        {
            headers: {
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
            },
            cache: "no-store",
        }
    );

    const result = await res.json();
    const content = result.content;

    const users = content?.data ?? [];
    const totalRow = content?.totalRow ?? 0;
    const totalPages = Math.ceil(totalRow / pageSize);

    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left">Tên</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Số điện thoại</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Giới tính</th>
                            <th className="px-6 py-3 text-left">Password</th>
                            <th className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    Không tìm thấy người dùng
                                </td>
                            </tr>
                        )}

                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone || '—'}</td>
                                <td className="px-6 py-4">{user.role ?? 'USER'}</td>
                                <td className="px-6 py-4">{user.gender ? 'Nam' : 'Nữ'}</td>
                                <td className="px-6 py-4">{user.password ? '●●●●●' : '—'}</td>
                                <td className="px-6 py-4 text-center">
                                    <UserActions userId={user.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                page={page}
                keyword={keyword}
                totalPages={totalPages}
            />
        </>
    );
}
