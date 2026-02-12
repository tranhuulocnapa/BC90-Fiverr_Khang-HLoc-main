import DashboardStats from "@/app/components/admin/DashboardStats";
import DashboardChart from "@/app/components/admin/DashboardChart";

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-2 text-gray-600">Chào mừng bạn vào trang quản trị</p>
            </div>

            {/* Stats row */}
            <div className="rounded-xl bg-white p-6 shadow">
                <DashboardStats />
            </div>

            {/* Chart */}
            <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
                <p className="space py-6 text-gray-600">Hiển thị thống kê và số lượng User BookHiredJob & List Job</p>
                <div className="space py-6">
                    <DashboardChart />
                </div>
            </div>
        </div>
    );
}
