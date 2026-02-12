import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "publer-blue": "#00A4FF",
                "publer-dark-blue": "#008EE6",
                "publer-light-gray": "#F0F2F5",
                "publer-gray": "#E4E6EB",
                "publer-dark-gray": "#BCC0C4",
            },
        },
    },
    plugins: [],
};
export default config;
