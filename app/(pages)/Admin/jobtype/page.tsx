import JobTypeHeader from "./components/JobTypeHeader";
import JobTypeTable from "./components/JobTypeTable";

export default async function Jobtype({ searchParams, }: {
    searchParams: { keyword?: string; page?: string };
}) {

    const params = await searchParams;
    const keyword = params.keyword || "";
    const page = Number(searchParams.page) || 1;

    return (
        <div className="space-y-6 p-6">
            <JobTypeHeader />
            <JobTypeTable keyword={keyword} page={page} />
        </div>
    );
}
