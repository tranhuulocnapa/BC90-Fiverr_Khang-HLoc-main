"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";
import { getJobDetail, getCommentsByJob, hireJob } from "@/app/services/job";
import { TJobDetail, TComment } from "@/app/types";
import HomeHeader from "@/app/components/HomeHeader";
import HomeFooter from "@/app/components/HomeFooter";
import BackToTopButton from "@/app/components/BackToTop";
import StickyNav from "@/app/components/StickyNav";
import CommentSection from "./comment";

const JobDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState<TJobDetail | null>(null);
    const [comments, setComments] = useState<TComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobData = async () => {
            if (id) {
                try {
                    const jobData = await getJobDetail(Number(id));
                    if (jobData.content.length > 0) {
                        setJob(jobData.content[0]);
                    }
                    const commentsData = await getCommentsByJob(Number(id));
                    setComments(commentsData.content);
                } catch (error) {
                    console.error("Failed to fetch job data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchJobData();
    }, [id]);

    const handleCheckoutHire = async () => {
        if (job) {router.push(`/checkout/${job.id}`);}
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-rose-500 animate-spin"></div>
            </div>
        );
    }

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <>
            <HomeHeader />
            <StickyNav headerHeight={140} />
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold mb-4">{job.congViec.tenCongViec}</h1>
                        <div className="flex items-center mb-4">
                            <img
                                src={job.avatar || `https://placehold.co/40x40`}
                                alt={job.tenNguoiTao}
                                width={40}
                                height={40}
                                className="rounded-full mr-4"
                            />
                            <div>
                                <p className="font-bold">{job.tenNguoiTao}</p>
                                <div className="flex items-center text-yellow-500">
                                    <StarFilled />&nbsp;
                                    <span>{job.congViec.saoCongViec}</span>
                                    <span className="text-gray-500 ml-1">({job.congViec.danhGia} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <img
                            src={job.congViec.hinhAnh || `https://placehold.co/800x450`}
                            alt={job.congViec.tenCongViec}
                            width={800}
                            height={450}
                            className="rounded-lg mb-8"
                        />
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-bold mb-4">About This Gig</h2>
                            <p>{job.congViec.moTa}</p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">About The Seller</h2>
                            <div className="flex items-center">
                                <img
                                    src={job.avatar || `https://placehold.co/100x100`}
                                    alt={job.tenNguoiTao}
                                    width={100}
                                    height={100}
                                    className="rounded-full mr-6"
                                />
                                <div>
                                    <p className="font-bold text-xl">{job.tenNguoiTao}</p>
                                    <p className="text-gray-600">Level 2 Seller</p>
                                    <div className="flex items-center text-yellow-500 mt-2">
                                        <StarFilled />&nbsp;
                                        <span>{job.congViec.saoCongViec}</span>
                                        <span className="text-gray-500 ml-1">({job.congViec.danhGia})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <details key={i} className="p-4 border rounded-lg">
                                        <summary className="font-bold cursor-pointer">There are many passages but the majority?</summary>
                                        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus qui voluptatem nemo! Sic aliquam optio incidunt temporibus, eligendi porro ducimus nulla modi, ut deserunt repudiandae.</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                        <CommentSection jobId={String(job.id)} initialComments={comments} />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-6 border rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-xl">Basic</h3>
                                <p className="font-bold text-2xl">US${job.congViec.giaTien}</p>
                            </div>
                            <p className="text-gray-600 mb-4">{job.congViec.moTaNgan}</p>
                            <ul className="space-y-2 text-gray-600 mb-6">
                                <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Good feature</li>
                                <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Good feature</li>
                                <li className="flex items-center"><svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Good feature</li>
                            </ul>
                            <button
                                onClick={handleCheckoutHire}
                                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                            >
                                Continue (US${job.congViec.giaTien})
                            </button>
                            <button className="w-full mt-2 py-3 text-green-500 font-bold rounded-lg border border-green-500 hover:bg-green-50">
                                Compare Packages
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative bg-white">
                <BackToTopButton />
                <HomeFooter />
            </div>
        </>
    );
};

export default JobDetailPage;
