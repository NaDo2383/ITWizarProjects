/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    env: {
        url: process.env.url,
        UPLOAD_PATH: process.env.UPLOAD_PATH,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.url}/:path*`,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ipfs.io",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
