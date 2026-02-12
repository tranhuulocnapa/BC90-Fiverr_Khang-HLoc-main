"use client";
import HomeHeader from "@/app/components/HomeHeader";
import HomeFooter from "@/app/components/HomeFooter";

export default function AboutPage() {
  return (
    <>
      <HomeHeader />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">About</h1>
        <p className="mt-4 text-gray-700">
          Thông tin về dự án hoặc trang About.
        </p>
      </main>
      <HomeFooter />
    </>
  );
}
