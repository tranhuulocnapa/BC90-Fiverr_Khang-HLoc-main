import JobHeader from "./components/JobHeader";
import JobTable from "./components/JobTable";

type JobsPageProps = {
    searchParams: Promise<{
        keyword?: string;
        page?: string;
    }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
    const params = await searchParams;

    const keyword = params.keyword ?? "";
    const page = Number(params.page ?? 1);

    return (
        <div className="space-y-6">
            <JobHeader />
            <JobTable keyword={keyword} page={page} />
        </div>
    );
}
