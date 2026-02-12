"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobsByDetailType } from "@/app/services/job";
import HomeHeader from "@/app/components/HomeHeader";
import BackToTopButton from "@/app/components/BackToTop";
import HomeFooter from "@/app/components/HomeFooter";
import StickyNav from "@/app/components/StickyNav";
import Link from "next/link";
import { TJob } from "@/app/types";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import { Suspense } from "react";

const CategoriesContent = () => {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobTypeId = searchParams.get("jobTypeId");
    if (jobTypeId) {
      getJobsByDetailType(parseInt(jobTypeId, 10))
        .then((data) => {
          setJobs(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <>
      <HomeHeader />
      <StickyNav headerHeight={140} />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex justify-between items-center py-4 my-4">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                Category{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                Service Options{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                Seller Details{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                Delivery Time{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="block bg-gray-200 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  Pro services
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="block bg-gray-200 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  Local sellers
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="block bg-gray-200 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  Online sellers
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {jobs.length} service{jobs.length !== 1 ? "s" : ""} available
            </p>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Sort by</span>
              <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center font-bold">
                Relevance{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {jobs.map((job) => (
            <Link key={job.id} href={`/detail/${job.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <img
                  src={
                    job.congViec.hinhAnh
                      ? job.congViec.hinhAnh!
                      : `https://placehold.co/550x300`
                  }
                  alt={job.congViec.tenCongViec}
                  width={550}
                  height={300}
                  className="object-cover"
                />

                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {job.tenNguoiTao ? (
                      <>
                        <img
                          src={
                            job.avatar
                              ? job.avatar!
                              : `https://i.pravatar.cc/24`
                          }
                          alt={job.tenNguoiTao}
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold text-gray-900">
                          {job.tenNguoiTao}
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src="https://i.pravatar.cc/24"
                          alt="User avatar"
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <span className="font-bold text-gray-900">
                          Moriah Ad
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-800 hover:text-rose-500 cursor-pointer mb-2 h-12 overflow-hidden">
                    {job.congViec.tenCongViec}
                  </p>

                  <div className="flex items-center text-yellow-500 mb-2">
                    <StarFilled />
                    &nbsp;
                    <span className="text-yellow-500">
                      {job.congViec.saoCongViec}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({job.congViec.danhGia})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <HeartOutlined className="text-gray-500 cursor-pointer" />
                    <div className="text-right">
                      <span className="text-xs text-gray-500">STARTING AT</span>{" "}
                      &nbsp;
                      <span className="font-bold text-lg">
                        US${job.congViec.giaTien}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative bg-white">
        <BackToTopButton />
        <HomeFooter />
      </div>
    </>
  );
};

const CategoriesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesContent />
    </Suspense>
  );
};

export default CategoriesPage;
