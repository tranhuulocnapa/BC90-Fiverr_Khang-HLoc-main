"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobMenu } from "@/app/services/job";
import HomeHeader from "@/app/components/HomeHeader";
import BackToTopButton from "@/app/components/BackToTop";
import HomeFooter from "@/app/components/HomeFooter";
import StickyNav from "@/app/components/StickyNav";
import Link from "next/link";

const TitlePage = () => {
    const searchParams = useSearchParams();
    const titleId = searchParams.get("id");
    const [title, setTitle] = useState<any>(null);
    const [subtitles, setSubtitles] = useState<any[]>([]);

    useEffect(() => {
        const fetchTitleData = async () => {
            if (titleId) {
                try {
                    const menuData = await getJobMenu();
                    const currentTitle = menuData.content.find(
                        (title: any) => title.id.toString() === titleId
                    );
                    if (currentTitle) {
                        setTitle(currentTitle);
                        setSubtitles(currentTitle.dsNhomChiTietLoai);
                    }
                } catch (error) {
                    console.error("Failed to fetch title data:", error);
                }
            }
        };
        fetchTitleData();
    }, [titleId]);

    if (!title) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HomeHeader />
            <StickyNav headerHeight={140} />

            <div className="px-4 py-16 border rounded-md" style={{ backgroundColor: '#123d24' }}>
                <div className="text-center text-white">
                    <p className="text-2xl mb-5">Designs to make you stand out</p>
                    <button className="bg-transparent border border-gray-300 rounded-md py-1 px-3 flex items-center mx-auto text-sm">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>How Works</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold mb-4">Most popular in Graphics & Design</h2>
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                        <img src="/img/Categories/Logo design_2x.png" alt="Minimalist Logo Design" width={40} height={40} />
                        <span>Minimalist Logo Design</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                        <img src="/img/Categories/Architecture.png" alt="Architecture & Interior Design" width={40} height={40} />
                        <span>Architecture & Interior Design</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                        <img src="/img/Categories/Photoshop.png" alt="Image Editing" width={40} height={40} />
                        <span>Image Editing</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                        <img src="/img/Categories/NftArt.png" alt="NFT Art" width={40} height={40} />
                        <span>NFT Art</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                        <img src="/img/Categories/T-Shirts.png" alt="T-Shirts & Merchandise" width={40} height={40} />
                        <span>T-Shirts & Merchandise</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-2 ">
                <h1 className="text-3xl font-bold mb-4">{title.tenLoaiCongViec}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subtitles.map((sub) => (
                        <div key={sub.id} className="border rounded-lg p-4">
                            {sub.hinhAnh ? (
                                <img
                                    src={sub.hinhAnh}
                                    alt={sub.tenNhom}
                                    width={550}
                                    height={300}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                                    <p className="text-gray-500">No Image Available</p>
                                </div>
                            )}
                            <h2 className="text-xl font-semibold mt-4">{sub.tenNhom}</h2>
                            <ul className="mt-2">
                                {sub.dsChiTietLoai.map((detail: any) => (
                                    <li key={detail.id} className="text-gray-600">
                                        <Link href={`/Categories?id=${detail.id}`}>
                                            {detail.tenChiTiet}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-center mb-8">Services Related To Graphics & Design</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Minimalist logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Signature logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Mascot logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">3d logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Hand drawn logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Vintage logo design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Remove background</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Photo restoration</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Photo retouching</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Image resize</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Product label design</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Custom twitch overlay</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Custom twitch emotes</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Gaming logo</button>
                    <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full">Children book illustration</button>
                </div>
            </div>

            <div className="relative bg-white">
                <BackToTopButton />
                <HomeFooter />
            </div>
        </>

    );
};

export default TitlePage;
