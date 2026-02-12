import UserHeader from "./components/UserHeader";
import UserTable from "./components/UserTable";

type UsersPageProps = {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
    }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const params = await searchParams;

    const keyword = params.keyword ?? "";
    const page = Number(params.page ?? 1);

    return (
        <div className="space-y-6">
            <UserHeader />
            <UserTable keyword={keyword} page={page} />
        </div>
    );
}
