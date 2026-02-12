import Link from "next/link";
import {
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaPinterest,
    FaInstagram,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa";

const HomeFooter = () => {
    const categories = [
        { name: "Graphics & Design", link: "#" },
        { name: "Digital Marketing", link: "#" },
        { name: "Writing & Translation", link: "#" },
        { name: "Video & Animation", link: "#" },
        { name: "Music & Audio", link: "#" },
        { name: "Programming & Tech", link: "#" },
        { name: "Data", link: "#" },
        { name: "Business", link: "#" },
        { name: "Lifestyle", link: "#" },
        { name: "Sitemap", link: "#" },
    ];

    const about = [
        { name: "Careers", link: "#" },
        { name: "Press & News", link: "#" },
        { name: "Partnerships", link: "#" },
        { name: "Privacy Policy", link: "#" },
        { name: "Terms of Service", link: "#" },
        { name: "Intellectual Property Claims", link: "#" },
        { name: "Investor Relations", link: "#" },
    ];

    const support = [
        { name: "Help & Support", link: "#" },
        { name: "Trust & Safety", link: "#" },
        { name: "Selling on Aura Fiverr", link: "#" },
        { name: "Buying on Aura Fiverr", link: "#" },
    ];

    const community = [
        { name: "Community Standards", link: "#" },
        { name: "Podcast", link: "#" },
        { name: "Affiliates", link: "#" },
        { name: "Invite a Friend", link: "#" },
        { name: "Become a Seller", link: "#" },
    ];

    const moreFromFiverr = [
        { name: "Aura Fiverr Business", link: "#" },
        { name: "Aura Fiverr Pro", link: "#" },
        { name: "Aura Fiverr Logo Maker", link: "#" },
        { name: "Aura Fiverr Guides", link: "#" },
        { name: "Get Inspired", link: "#" },
        { name: "ClearVoice", link: "#" },
        { name: "Aura Fiverr Workspace", link: "#" },
        { name: "Learn", link: "#" },
    ];

    const socialLinks = [
        { icon: <FaTwitter />, link: "#" },
        { icon: <FaFacebook />, link: "#" },
        { icon: <FaLinkedin />, link: "#" },
        { icon: <FaPinterest />, link: "#" },
        { icon: <FaInstagram />, link: "#" },
        { icon: <FaThreads />, link: "#" },
    ];

    return (
        <footer className="bg-gray-100 text-gray-500">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="hover:text-gray-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800">About</h3>
                        <ul className="space-y-2">
                            {about.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="hover:text-gray-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800">Support</h3>
                        <ul className="space-y-2">
                            {support.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="hover:text-gray-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800">Community</h3>
                        <ul className="space-y-2">
                            {community.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="hover:text-gray-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800">More From Aura Fiverr</h3>
                        <ul className="space-y-2">
                            {moreFromFiverr.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="hover:text-gray-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/img/Logo.png" className="h-30 sm:h-15 object-contain" alt="Logo" />
                    </div>
                    <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} Aura Fiverr International Ltd.
                    </p>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                            <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                                <IoLanguage />
                                <span>English</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                                <FaDollarSign />
                                <span>USD</span>
                            </button>
                            <button className="p-2 border rounded-full hover:bg-gray-200 transition-colors">
                                <FaAccessibleIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default HomeFooter;
