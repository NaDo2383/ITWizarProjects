/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        SERVER: process.env.SERVER,
        API_URL: process.env.API_URL,
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "/api",
    //             hostname: "**",
    //         },
    //     ],
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: `${process.env.API_URL}/:path*`,
    //         },
    //     ]
    // },
}

module.exports = nextConfig
