"use client";

import { useEffect, useState } from "react";
import { Paper, SimpleGrid, Text, Group } from "@mantine/core";
import api from "@/app/services/api";

// Small internal animated number (simple CountUp-like behavior)
export function AnimatedNumber({ value }: { value: number }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        let start = performance.now();
        const duration = 1200;
        const from = Number(current);
        const to = Number(value);
        let raf = 0;

        function step(ts: number) {
            const t = Math.min(1, (ts - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = Math.round(from + (to - from) * eased);
            setCurrent(val);
            if (t < 1) raf = requestAnimationFrame(step);
        }

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return <>{current.toLocaleString()}</>;
}

export default function DashboardStats() {
    const [users, setUsers] = useState<number | null>(null);
    const [listings, setListings] = useState<number | null>(null);
    const [bookings, setBookings] = useState<number | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                // Total users via paginated endpoint (read totalRow)
                const uRes = await api.get(`/users/phan-trang-tim-kiem?pageIndex=1&pageSize=1&keyword=`);
                const totalUsers = uRes.data.content?.totalRow ?? null;
                setUsers(totalUsers);

                // Listings (cong-viec)
                const lRes = await api.get(`/cong-viec`);
                let jobs: any[] = [];
                if (Array.isArray(lRes.data)) jobs = lRes.data;
                else if (lRes.data?.content)
                    jobs = Array.isArray(lRes.data.content)
                        ? lRes.data.content
                        : lRes.data.content.data ?? [];
                else if (lRes.data?.data)
                    jobs = Array.isArray(lRes.data.data) ? lRes.data.data : [];
                setListings(jobs.length);

                // Bookings (thue-cong-viec)
                const bRes = await api.get(`/thue-cong-viec`);
                const bookingsList = bRes.data?.content ?? bRes.data ?? [];
                const bookingsCount = Array.isArray(bookingsList)
                    ? bookingsList.length
                    : 0;
                setBookings(bookingsCount);

                // Monthly revenue: sum of job prices for bookings in current month
                const now = new Date();
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();

                // Build map of jobId -> price
                const idToPrice: Record<string | number, number> = {};
                jobs.forEach((j: any) => {
                    const id = j.id ?? j.maCongViec ?? j?.maCongViec;
                    const price = Number(j.giaTien ?? 0) || 0;
                    if (id != null) idToPrice[id] = price;
                });

                let revenue = 0;
                if (Array.isArray(bookingsList)) {
                    bookingsList.forEach((b: any) => {
                        const dateStr = b.ngayThue ?? b.ngayThanhToan ?? null;
                        let d = dateStr ? new Date(dateStr) : null;
                        if (!d && b?.ngayThue) d = new Date(b.ngayThue);
                        if (
                            d &&
                            d.getMonth() === thisMonth &&
                            d.getFullYear() === thisYear
                        ) {
                            // Try booking price else use job price by maCongViec
                            const price =
                                Number(b.giaTien ?? 0) ||
                                idToPrice[b.maCongViec ?? b.maCongViecId] ||
                                0;
                            revenue += price;
                        }
                    });
                }
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            }
        }

        loadStats();
    }, []);

    const card = (
        label: string,
        value: number | null,
        prefix = "",
        suffix = ""
    ) => (
        <Paper p="md" withBorder radius="md">
            <Text size="xs" color="dimmed">
                {label}
            </Text>

            <Group position="apart" align="center" mt="xs">
                <Text size="xl" weight={700}>
                    {value == null ? "—" : <AnimatedNumber value={value} />}
                    {suffix}
                </Text>
            </Group>
        </Paper>
    );

    return (
        <SimpleGrid cols={3} spacing="sm">
            {card("Total Users", users)}
            {card("Active Job Listings", listings)}
            {card("Total Bookings", bookings)}
        </SimpleGrid>
    );
}
