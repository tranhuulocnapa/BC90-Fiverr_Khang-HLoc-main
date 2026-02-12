"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import {
  AudioOutlined,
  BulbOutlined,
  CodeOutlined,
  CoffeeOutlined,
  FormatPainterOutlined,
  ShopOutlined,
  AuditOutlined,
  TranslationOutlined,
  VideoCameraOutlined,
  CheckCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import HomeHeader from "./components/HomeHeader";
import HomeFooter from "./components/HomeFooter";
import BackToTopButton from "./components/BackToTop";
import SocialMedia from "./components/SocialMedia";
import StickyNav from "./components/StickyNav";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [homeReady, setHomeReady] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const categories = [
    { name: "Programming & Tech", icon: <CodeOutlined className="text-3xl" /> },
    { name: "Graphics & Design", icon: <FormatPainterOutlined className="text-3xl" /> },
    { name: "Digital Marketing", icon: <BulbOutlined className="text-3xl" /> },
    { name: "Writing & Translation", icon: <TranslationOutlined className="text-3xl" /> },
    { name: "Video & Animation", icon: <VideoCameraOutlined className="text-3xl" /> },
    { name: "Lifestyle", icon: <CoffeeOutlined className="text-3xl" /> },
    { name: "Music & Audio", icon: <AudioOutlined className="text-3xl" /> },
    { name: "Business", icon: <ShopOutlined className="text-3xl" /> },
    { name: "Data", icon: <AuditOutlined className="text-3xl" /> },
  ];

  const professionalServices = [
    {
      subtitle: "Build your brand",
      title: "Logo Design",
      image: "/img/professional/logo-design.png",
    },
    {
      subtitle: "Customize your site",
      title: "AI Development",
      image: "/img/professional/AI Development.png",
    },
    {
      subtitle: "Share your message",
      title: "Voice Over",
      image: "/img/professional/voice-over.png",
    },
    {
      subtitle: "Engage your audience",
      title: "Video Explainer",
      image: "/img/professional/UGCVideoimg.png",
    },
    {
      subtitle: "Reach more customers",
      title: "Social Media",
      image: "/img/professional/social-media-marketing.png",
    },
  ];

  const trustedServices = [
    { name: "3D Industrial Design", image: "/img/Trusted/3D-Industrial-Design_2x.png" },
    { name: "E-commerce Website Development", image: "/img/Trusted/E-commerce-Website-Development_2x.png" },
    { name: "Email Marketing", image: "/img/Trusted/Email-Marketing_2x.png" },
    { name: "Press Releases", image: "/img/Trusted/Press-Releases_2x.png" },
    { name: "Logo Design", image: "/img/Trusted/Logo-Design_2x.png" },
  ];

  const madeOnFiverr = [
    {
      img: "/img/MadeOnFiverr/1_InteractiveLightMix.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/1.jpeg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/Appmockup.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/Enscape.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/F_1.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/GIGreview.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/hero.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/landscape.jpeg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/Mockup.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/mockup2.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/Revision2.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/mockup3.jpg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/tupp.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/Weddingnoword.png",
      title: "Logo Design",
      author: "by romisriyooo"
    },
    {
      img: "/img/MadeOnFiverr/IMG_7140.jpeg",
      title: "Logo Design",
      author: "by romisriyooo"
    },
  ];

  const testimonials = [
    {
      video: "/img/video1.mp4",
      poster: "/img/MadeOnFiverr/testimonial1.png",
      author: "Kay Kim, Co-Founder",
      company: "rooted",
      quote: "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working."
    },
    {
      video: "/img/video2.mp4",
      poster: "/img/MadeOnFiverr/testimonial2.png",
      author: "Caitlin Tormey, Chief Commercial Officer",
      company: "Naadam",
      quote: "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day."
    },
    {
      video: "/img/video3.mp4",
      poster: "/img/MadeOnFiverr/testimonial3.png",
      author: "Brighid Gannon, Co-Founder",
      company: "Lavender",
      quote: "Fiverr has been a key part of our growth strategy. The platform is easy to use and connects us with top-tier talent for any project we can dream up."
    },
    {
      video: "/img/video4.mp4",
      poster: "/img/MadeOnFiverr/testimonial4.png",
      author: "Tim and Dan Joo, Co-Founders",
      company: "HÆRFEST",
      quote: "When you want to create a business bigger than yourself, you need a lot of help. That's what does."
    }
  ];

  useEffect(() => {
    let wow: any;

    import("wowjs/dist/wow").then((module) => {
      const WOW = module.WOW;
      wow = new WOW({ live: false, offset: 80 });
      wow.init();
    });

    const t = setTimeout(() => setSplashDone(true), 80);

    return () => {
      clearTimeout(t);
      wow = null;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#C6C6C6] via-[#8D8D8D] to-[#383838] relative overflow-hidden">

      <div className="fixed inset-0 z-100 pointer-events-none">
        <motion.div
          initial={{ y: 0 }}
          animate={splashDone ? { y: "-100%" } : {}}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#1C1C1C]"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={splashDone ? { y: "100%" } : {}}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1C1C1C]"
        />
      </div>

      <motion.div
        className="relative w-full bg-white origin-center"
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={splashDone ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setHomeReady(true)}
      >

        <HomeHeader
          isHome
          homeAnimationDone={homeReady}
          onStickyChange={setIsHeaderSticky}
        />
        <main className="w-full">
          <section id="hero-section" className="relative h-screen">
            <div className="absolute inset-0">
              <Swiper
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 5200 }}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                <SwiperSlide className="relative">
                  <img src="/img/Carousel/hero.png" className="w-full h-full object-cover animate__animated animate__fadeIn" />
                  <div className="absolute inset-0 bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">Our freelancers<br />will take it from here</h1>
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <input type="text" placeholder="Search for any service..." className="w-full p-4 rounded-md bg-amber-300 text-gray-900" />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-600 text-amber-400 p-3 rounded-md hover:bg-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Website Development &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Architecture & Interior Design &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">UGC Videos &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Video Editing &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Book Publishing &rarr;</button>
                    </div>
                    <div className="px-6 py-10 flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
                      <span className="font-semibold">Trusted by:</span>
                      <img src="/img/Trusted/meta.svg" alt="Meta" className="h-5" />
                      <img src="/img/Trusted/google.svg" alt="Google" className="h-5" />
                      <img src="/img/Trusted/netflix.svg" alt="Netflix" className="h-5" />
                      <img src="/img/Trusted/pg.svg" alt="P&G" className="h-5" />
                      <img src="/img/Trusted/paypal.svg" alt="PayPal" className="h-5" />
                      <img src="/img/Trusted/payoneer.svg" alt="Payoneer" className="h-6" />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="relative">
                  <img src="/img/Carousel/bg-first-hero.jpg" className="w-full h-full object-cover animate__animated animate__fadeIn" />
                  <div className="absolute inset-0 bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">Our freelancers<br />will take it from here</h1>
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <input type="text" placeholder="Search for any service..." className="w-full p-4 rounded-md bg-amber-300 text-gray-900" />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-600 text-amber-400 p-3 rounded-md hover:bg-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Website Development &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Architecture & Interior Design &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">UGC Videos &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Video Editing &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Book Publishing &rarr;</button>
                    </div>
                    <div className="px-6 py-10 flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
                      <span className="font-semibold">Trusted by:</span>
                      <img src="/img/Trusted/meta.svg" alt="Meta" className="h-5" />
                      <img src="/img/Trusted/google.svg" alt="Google" className="h-5" />
                      <img src="/img/Trusted/netflix.svg" alt="Netflix" className="h-5" />
                      <img src="/img/Trusted/pg.svg" alt="P&G" className="h-5" />
                      <img src="/img/Trusted/paypal.svg" alt="PayPal" className="h-5" />
                      <img src="/img/Trusted/payoneer.svg" alt="Payoneer" className="h-6" />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {homeReady && (
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="fixed left-1 bottom-[20%] z-10"
              >
                <SocialMedia />
              </motion.div>
            )}
          </section>

          <StickyNav headerHeight={isHeaderSticky ? 80 : 0} />
          <section className="w-full py-10 bg-white px-6">
            <h2 className="text-3xl text-teal-800 md:text-4xl font-bold text-center mb-16 wow animate__animated animate__fadeInUp">
              Popular Professional Services
            </h2>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".prof-next",
                  prevEl: ".prof-prev",
                }}
                pagination={{ clickable: true }}
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                className="professional-services-slider"
              >
                {professionalServices.map((service) => (
                  <SwiperSlide key={service.title}>
                    <div className="relative h-80 rounded-md overflow-hidden group cursor-pointer">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 text-green-600">
                        <p className="text-sm font-light">{service.subtitle}</p>
                        <h3 className="font-bold text-2xl">{service.title}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="prof-prev absolute top-1/2 -translate-y-1/2 left-2 z-20 cursor-pointer bg-yellow-400 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="prof-next absolute top-1/2 -translate-y-1/2 right-2 z-20 cursor-pointer bg-yellow-400 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </section>

          <section className="w-full py-20 bg-[#f1fdf7]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 lg:pr-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0d472d] mb-8">
                    A whole world of freelance talent at your fingertips
                  </h2>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <CheckCircleOutlined className="text-gray-500 mr-4 mt-1 text-xl" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">The best for every budget</h3>
                        <p className="text-gray-600 mt-1">Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleOutlined className="text-gray-500 mr-4 mt-1 text-xl" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Quality work done quickly</h3>
                        <p className="text-gray-600 mt-1">Find the right freelancer to begin working on your project within minutes.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleOutlined className="text-gray-500 mr-4 mt-1 text-xl" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Protected payments, every time</h3>
                        <p className="text-gray-600 mt-1">Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleOutlined className="text-gray-500 mr-4 mt-1 text-xl" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">24/7 support</h3>
                        <p className="text-gray-600 mt-1">Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
                  <div className="relative">
                    <video controls poster="/img/fiverrpro.mp4" className="rounded-lg w-full">
                      <source src="/img/fiverrpro.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-20 bg-[#f1fdf7]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".testimonial-next",
                  prevEl: ".testimonial-prev",
                }}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                className="testimonial-slider"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col lg:flex-row items-center">
                      <div className="w-full lg:w-1/2">
                        <div className="relative">
                          <video controls poster={testimonial.poster} className="rounded-lg w-full">
                            <source src={testimonial.video} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 lg:pl-16 mt-10 lg:mt-0">
                        <p className="text-2xl ml-3 text-gray-600">
                          {testimonial.author}, <span className="font-bold">{testimonial.company}</span>
                        </p>
                        <blockquote className="text-2xl ml-3 md:text-3xl italic text-gray-800 mt-4">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="testimonial-prev absolute top-1/2 -translate-y-1/2 -left-10 z-10 cursor-pointer bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="testimonial-next absolute top-1/2 -translate-y-1/2 -right-10 z-10 cursor-pointer bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-white px-6">
            <h2 className="text-3xl text-teal-800 md:text-4xl font-bold text-center mb-14 wow animate__animated animate__fadeInUp">
              Vontélle’s trusted services
            </h2>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-4">
                {trustedServices.map((service) => (
                  <div key={service.name} className="flex flex-col items-center justify-start pt-6 pb-4 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-56 h-48 cursor-pointer group">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <img src={service.image} alt={service.name} className="max-h-full max-w-full" />
                    </div>
                    <p className="text-base font-medium text-gray-800 group-hover:text-black text-center transition-colors duration-300">
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-gray-50">
            <h2 className="text-3xl text-teal-800 md:text-4xl font-bold text-center mb-16 wow animate__animated animate__fadeInUp">
              Explore the marketplace
            </h2>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category) => (
                  <div key={category.name} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-40 h-36 cursor-pointer group">
                    <div className="text-gray-500 group-hover:text-amber-500 transition-colors duration-300">
                      {category.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-black text-center mt-3 transition-colors duration-300">
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-white px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-700">Made on AuraFiverr</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4 masonry-grid">
                {madeOnFiverr.map((item, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-lg h-64 break-inside-avoid">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-lg group-hover:blur-sm transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-red-600 font-bold">{item.title}</h3>
                          <p className="text-amber-300 text-sm">{item.author}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="text-red-600 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all">
                        <HeartOutlined className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-20 bg-green-800 text-amber-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Your business, your terms, your success
              </h2>
              <p className="text-xl mb-8">
                AuraFiverr gives you the tools to build a business you're proud of
              </p>
              <button className="bg-white text-green-800 font-bold py-3 px-8 rounded-lg hover:bg-amber-500 transition-colors">
                Get Started
              </button>
            </div>
          </section>

          <div className="relative bg-white">
            <BackToTopButton />
            <HomeFooter />
          </div>

        </main>
      </motion.div>
    </div>
  );
}
