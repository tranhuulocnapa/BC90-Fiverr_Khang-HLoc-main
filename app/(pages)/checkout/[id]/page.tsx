"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJobDetail, hireJob } from "@/app/services/job";
import { TJobDetail } from "@/app/types";
import HomeHeader from "@/app/components/HomeHeader";
import HomeFooter from "@/app/components/HomeFooter";

const CheckoutPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState<TJobDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState("card");

    // Initialize user from localStorage (only once)
    useEffect(() => {
        const userLogin = localStorage.getItem("USER_LOGIN");
        if (userLogin) {
            try {
                setUser(JSON.parse(userLogin).content.user);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
    }, []);

    // Fetch job data
    useEffect(() => {
        const fetchJobData = async () => {
            if (id) {
                try {
                    const jobData = await getJobDetail(Number(id));
                    setJob(jobData.content.length > 0 ? jobData.content[0] : null);
                } catch (error) {
                    console.error("Failed to fetch job data:", error);
                    setJob(null);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchJobData();
    }, [id]);

    const handlePay = useCallback(async () => {
        if (job && user) {
            try {
                const hireData = {
                    maCongViec: job.id,
                    maNguoiThue: user.id,
                    ngayThue: new Date().toISOString(),
                };
                await hireJob(hireData);
                window.dispatchEvent(new CustomEvent("JOB_HIRED_SUCCESS"));
                alert("Payment successful!");
                router.push("/");
            } catch (error) {
                console.error("Failed to hire job:", error);
                alert("Payment failed. Please try again.");
            }
        }
    }, [job, user, router]);

    // Memoize price calculation
    const priceData = useMemo(() => {
        if (!job) return { serviceFee: 0, total: 0 };
        const serviceFee = job.congViec.giaTien * 0.08;
        const total = job.congViec.giaTien + serviceFee;
        return { serviceFee, total };
    }, [job]);

    // Check loading state first
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-rose-500 animate-spin"></div>
            </div>
        );
    }

    // Then check if job exists
    if (!job) {
        return <div className="min-h-screen flex items-center justify-center">Job not found</div>;
    }

    return (
        <>
            <HomeHeader />
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order details</h2>
                        <div className="flex items-center mb-4">
                            <img src={job.avatar || `https://placehold.co/40x40`} alt={job.tenNguoiTao} width={40} height={40} className="rounded-full mr-4" />
                            <div>
                                <p className="font-bold">{job.tenNguoiTao}</p>
                                <p className="text-gray-600">{job.congViec.tenCongViec}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Basic</span> - <span>${job.congViec.giaTien}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold">Description:</span> {job.congViec.moTaNgan}
                        </div>
                        {user && (
                            <div className="mb-4">
                                <span className="font-bold">Billing information:</span>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                            </div>
                        )}

                        <div className="mt-8 mb-4 p-4 border rounded-lg bg-gray-50">
                            <h3 className="text-lg font-bold mb-4">Price summary</h3>
                            <div className="flex justify-between mb-2">
                                <span>Selected package</span>
                                <span>${job.congViec.giaTien.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Service fee</span>
                                <span>${priceData.serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>${priceData.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Payment methods</h2>
                        <div className="mb-4 space-y-4">
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                                <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="h-5 w-5" />
                                <span className="ml-4 font-semibold">Credit & Debit Cards</span>
                                <div className="flex items-center ml-auto">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png" alt="Visa" className="w-10 mr-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="w-10 mr-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" className="w-10" />
                                </div>
                            </label>
                            {paymentMethod === "card" && (
                                <div className="p-4 border rounded-lg grid grid-cols-1 gap-4">
                                    <input type="text" placeholder="Card number" className="border p-2 rounded" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="MM/YY" className="border p-2 rounded w-1/2" />
                                        <input type="text" placeholder="CVV" className="border p-2 rounded w-1/2" />
                                    </div>
                                    <input type="text" placeholder="Cardholder's name" className="border p-2 rounded" />
                                </div>
                            )}
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                                <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} className="h-5 w-5" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="w-20 ml-4" />
                            </label>
                            {paymentMethod === "paypal" && (
                                <div className="p-4 border rounded-lg">
                                    <input type="email" placeholder="PayPal Email" className="border p-2 rounded w-full" />
                                </div>
                            )}
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                                <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} className="h-5 w-5" />
                                <span className="ml-4 font-semibold">Bank Transfer</span>
                            </label>
                            {paymentMethod === "bank" && (
                                <div className="p-4 border rounded-lg grid grid-cols-1 gap-4">
                                    <select className="border p-2 rounded">
                                        <option>Select Bank</option>
                                        <option>ACB</option>
                                        <option>Techcombank</option>
                                        <option>Vietcombank</option>
                                        <option>Sacombank</option>
                                        <option>Agribank</option>
                                        <option>BIDV</option>
                                    </select>
                                </div>
                            )}
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                                <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="h-5 w-5" />
                                <span className="ml-4 font-semibold">Pay with Cash</span>
                            </label>
                        </div>

                        <button onClick={handlePay} className="w-full py-3 bg-black text-white font-bold rounded-lg transition-all duration-300 hover:bg-linear-to-r hover:from-green-500 hover:to-blue-500">
                            Confirm and Pay
                        </button>
                        <p className="text-xs text-gray-500 mt-2 text-center">By clicking the button, you agree to Fiverr's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Payment Terms</a></p>
                        <p className="text-sm text-gray-600 mt-4 text-center flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1.944c-4.298 0-7.78 3.326-7.78 7.416 0 2.23.99 4.24 2.59 5.592.48.408.804.996.804 1.632v.912c0 .516.42.936.936.936h8.9c.516 0 .936-.42.936-.936v-.912c0-.636.324-1.224.804-1.632C16.79 13.6 17.78 11.59 17.78 9.36c0-4.09-3.482-7.416-7.78-7.416zm-3.33 8.88a1.11 1.11 0 100-2.22 1.11 1.11 0 000 2.22zm6.66 0a1.11 1.11 0 100-2.22 1.11 1.11 0 000 2.22z" clipRule="evenodd" />
                        </svg> Safe and secure payment</p>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </>
    );
};

export default CheckoutPage;
