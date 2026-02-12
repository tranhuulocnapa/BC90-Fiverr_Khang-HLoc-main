"use client";

import HomeFooter from "@/app/components/HomeFooter";
import HomeHeader from "@/app/components/HomeHeader";
import api from "@/app/services/api";
import { TBookingHireJobViewModel, TBookingHireJobApi, TUser } from "@/app/types";
import React, { useEffect, useState, useCallback } from "react";
import EditProfilePopUp from "./editProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUserLock, faStar } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/components/_Loading/Loading";
import Toast from "@/app/components/_Toast/Toast";
import LinkedAccounts from "./LinkedAccounts";
import StickyNav from "@/app/components/StickyNav";
import BackToTopButton from "@/app/components/BackToTop";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const Listing = () => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [hiredBookingJobs, setHiredBookingJobs] = useState<TBookingHireJobViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const calculatePrice = (job: TBookingHireJobViewModel) => {
    const price = Number(job.giaTien) || 0;
    const feeRates: { [key: string]: number } = {
      Premium: 0.2,
      Standard: 0.3,
    };
    const feeRate = feeRates[job.tenCongViec] || 0.1; // Default 10%
    const fee = price * feeRate;
    return price + fee;
  };

  const JobHiredPriceTotal = () => {
    // Calculate total price of hired jobs including service fee per job
    return hiredBookingJobs.reduce(
      (total, job) => total + calculatePrice(job),
      0
    );
  };

  const handleDeleteJob = async (jobId: number) => {
    Swal.fire({
      title: "Do you want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/thue-cong-viec/${jobId}`);
          Swal.fire("Job Hire Booking Delete Successfully!", "", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Failed to delete job", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const renderBookingHireJobs = (item: TBookingHireJobViewModel) => {
    return (
      <div key={item.id} className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Image */}
          <img
            src={item.hinhAnh}
            alt={String(item.tenCongViec)}
            className="w-28 sm:w-36 h-20 sm:h-24 object-cover rounded-xl shrink-0"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              {item.tenCongViec}
            </h4>
            <div className="flex items-center gap-1 text-sm text-amber-500 mt-1">
              <FontAwesomeIcon icon={faStar} />
              <span className="font-bold text-gray-700">{item.saoCongViec}</span>
              <span className="text-gray-500">({item.danhGia})</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2">
              {item.moTaNgan}
            </p>
          </div>

          {/* Price and Actions - Pushed to Right */}
          <div className="flex flex-col items-end justify-start gap-2 sm:gap-3 shrink-0 ml-4">
            <p className="font-bold text-base sm:text-lg text-gray-900">
              After Fee: ${calculatePrice(item)}
            </p>
            <p className="text-sm text-gray-500">
              Original: ${item.giaTien}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/detail/${item.id}`)}
                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium"
              >
                View detail
              </button>
              <button
                onClick={() => { handleDeleteJob(item.id); }}
                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const raw = localStorage.getItem("USER_LOGIN");
      if (!raw) {
        setUser(null);
        setHiredBookingJobs([]);
        return;
      }

      const parsed = JSON.parse(raw);
      const currentUser = parsed?.content?.user;
      if (!currentUser?.id) return;

      setUser(currentUser);

      const res = await api.get("thue-cong-viec/lay-danh-sach-da-thue");

      // const apiList: TBookingHireJobApi[] = res.data.content || [];

      // /* Backend already filters by login user */
      // const myJobs = apiList;

      /* MOCK DATA FOR TEST UI */
      const apiList = [
        {
          id: 1,
          maCongViec: 101,
          maNguoiThue: 15,
          ngayThue: "2026-02-01",
          hoanThanh: true,

          congViec: {
            tenCongViec: "I will do modern line art logo design",
            danhGia: 4,
            giaTien: 17,
            hinhAnh: "https://fiverrnew.cybersoft.edu.vn/images/cv2.jpg",
            moTa: "Professional modern logo design",
            moTaNgan: "Modern logo design service",
            saoCongViec: 5
          }
        },

        {
          id: 2,
          maCongViec: 102,
          maNguoiThue: 15,
          ngayThue: "2026-02-03",
          hoanThanh: false,

          congViec: {
            tenCongViec: "I will setup shopping ads and fix google merchant",
            danhGia: 5,
            giaTien: 10,
            hinhAnh: "https://fiverrnew.cybersoft.edu.vn/images/cv16.jpg",
            moTa: "Setup Google shopping ads",
            moTaNgan: "Fix merchant center",
            saoCongViec: 4
          }
        }
      ];

      /* Map API → ViewModel */
      // const mapped: TBookingHireJobViewModel[] = myJobs.map((job) => ({
      //   id: job.id,
      //   maNguoiThue: job.maNguoiThue,

      //   tenCongViec: job.congViec.tenCongViec,
      //   danhGia: job.congViec.danhGia,
      //   giaTien: job.congViec.giaTien,
      //   hinhAnh: job.congViec.hinhAnh,
      //   moTa: job.congViec.moTa,
      //   moTaNgan: job.congViec.moTaNgan,
      //   saoCongViec: job.congViec.saoCongViec,
      // }));
      // setHiredBookingJobs(mapped);

      /* Map to ViewModel */
      const mapped = apiList.map((job) => ({
        id: job.id,
        maNguoiThue: job.maNguoiThue,

        tenCongViec: job.congViec.tenCongViec,
        danhGia: job.congViec.danhGia,
        giaTien: job.congViec.giaTien,
        hinhAnh: job.congViec.hinhAnh,
        moTa: job.congViec.moTa,
        moTaNgan: job.congViec.moTaNgan,
        saoCongViec: job.congViec.saoCongViec,
      }));
      setHiredBookingJobs(mapped);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("LOGIN_SUCCESS", fetchData);
    return () => window.removeEventListener("LOGIN_SUCCESS", fetchData);
  }, [fetchData]);

  const handleEditProfile = async () => {
    try {
      const raw = localStorage.getItem("USER_LOGIN");
      if (!raw) {
        setUser(null);
        setHiredBookingJobs([]);
        return;
      }
      const parsed = JSON.parse(raw);
      const currentUser = parsed?.content?.user;
      if (!currentUser?.id) return;
      setUser(currentUser);
      await api.get(`users/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
    setIsEditOpen(true);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("formFile", file);

      try {
        const res = await api.post("/users/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.content) {
          fetchData();
          Swal.fire("Avatar updated successfully!", "", "success");
        }
      } catch (error) {
        Swal.fire("Failed to upload avatar", "", "error");
      }
    }
  };

  if (loading) {return (<Loading />);}

  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <HomeHeader />
        <main className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 text-center">

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-5 sm:mb-6">
            <FontAwesomeIcon icon={faUserLock} className="text-2xl sm:text-3xl text-gray-400" />
          </div>

          <h2 className="font-extrabold text-amber-700 mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Login to see your Job Hired
          </h2>

          <p className="text-gray-500 mb-8 max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Manage your Job Hired and Job Posted after logging in.
          </p>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("OPEN_AUTH_MODAL", { detail: { mode: "login" } })
              )
            }
            className="px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-br from-[#F0944D] to-[#ACCAD5] text-black rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 active:scale-95 cursor-pointer"
          >
            Login Now
          </button>
        </main>
        <div className="relative bg-white">
            <BackToTopButton /> 
            <HomeFooter />
        </div> 
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <HomeHeader />
      <StickyNav headerHeight={140} />

      <main className="container mx-auto px-60 py-10 md:py-10">
        <div className=" container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-14">
          <aside className="w-full lg:w-75 xl:w-87.5 shrink-0">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img src={user?.avatar || "/img/avatarLogo.jpg"} alt="User Avatar" style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-2 cursor-pointer hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </label>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">BASIC ACCOUNT</p>
                <div className="mt-6 text-left space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">EMAIL ADDRESS</p>
                    <p className="text-gray-800 wrap-break-words">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400">PHONE NUMBER</p>
                    <p className="text-gray-800">{user?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400">GENDER</p>
                    <p className="text-gray-800">{user?.gender ? "Male" : "Female"}</p>
                  </div>
                </div>
                <button onClick={handleEditProfile}
                  className="mt-8 w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              <LinkedAccounts />
            </div>
          </aside>

          <section className="w-full lg:w-[70%]">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black">
                Booking History
              </h1>
              <p className="text-gray-500 mt-2">
                You have {hiredBookingJobs.length} Job Hired
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {hiredBookingJobs.length === 0 && (
                <p className="text-gray-500 text-center">
                  You haven't hired any jobs yet.
                </p>
              )}
              {hiredBookingJobs.map((item) =>
                renderBookingHireJobs(item)
              )}
            </div>
            <div className="mt-8 flex justify-end">
              <div className="rounded-lg bg-linear-to-r from-amber-500 via-pink-500 to-purple-500 p-1 shadow-lg">
                <div className="rounded-md bg-white px-8 py-4">
                  <p className="text-xl font-bold text-gray-800">
                    Total Price: ${JobHiredPriceTotal()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {isEditOpen && (
        <EditProfilePopUp
          userId={user.id}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={() => {
            fetchData();
            setToastOpen(true);
          }}
        />
      )}

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type="success"
      >
        <div>
          <p className="font-bold text-sm">Profile updated</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Your information has been saved successfully
          </p>
        </div>
      </Toast>

      <div className="relative bg-white">
        <BackToTopButton />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Listing;
