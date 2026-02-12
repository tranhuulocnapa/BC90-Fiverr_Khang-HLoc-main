"use client";

import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import api from "@/app/services/api";

export default function DashboardChart() {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        async function loadChartData() {
            try {
                const uRes = await api.get(`/users/phan-trang-tim-kiem?pageIndex=1&pageSize=1&keyword=`);
                const totalUsers = uRes.data.content?.totalRow ?? 0;

                const lRes = await api.get(`/cong-viec`);
                let jobs: any[] = [];
                if (Array.isArray(lRes.data)) jobs = lRes.data;
                else if (lRes.data?.content)
                    jobs = Array.isArray(lRes.data.content)
                        ? lRes.data.content
                        : lRes.data.content.data ?? [];
                else if (lRes.data?.data)
                    jobs = Array.isArray(lRes.data.data) ? lRes.data.data : [];
                const totalListings = jobs.length;

                const bRes = await api.get(`/thue-cong-viec`);
                const bookingsList = bRes.data?.content ?? bRes.data ?? [];
                const totalBookings = Array.isArray(bookingsList)
                    ? bookingsList.length
                    : 0;

                setChartData([
                    { name: "Users", value: totalUsers },
                    { name: "Listings", value: totalListings },
                    { name: "Bookings", value: totalBookings },
                ]);
            } catch (err) {
                console.error("Failed to load chart data", err);
            }
        }

        loadChartData();
    }, []);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        content={({ label, payload }) => {
                            if (!payload || !payload.length) {
                                return null;
                            }
                            return (
                                <div
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "white",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    <div>{label}</div>
                                    {payload.map((item, index) => (
                                        <div key={index} style={{ color: item.fill }}>
                                            {`${item.name}: ${item.value}`}
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
