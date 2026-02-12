import JobServiceHeader from "./components/JobServiceHeader";
import JobServiceTable from "./components/JobServiceTable";

export default async function Jobservice({
    searchParams,
}: {
    searchParams: Promise<{ keyword?: string; page?: string }>;
}) {
    const params = await searchParams;
    const keyword = params.keyword || "";
    const page = Number(params.page) || 1;

    return (
        <div className="space-y-6 p-6">
            <JobServiceHeader />
            <JobServiceTable keyword={keyword} page={page} />
        </div>
    );
}
