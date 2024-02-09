/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        url: process.env.url,
        UPLOAD_PATH: process.env.UPLOAD_PATH,
        EVENT_WATCHER_API: process.env.EVENT_WATCHER_API,
    },
    swcMinify: false,
    async rewrites() {
        return [
            // {
            //     source: '/apiVp/:path*',
            //     destination: `http://180.210.82.249:3000/api/:path*`,
            // },
            {
                source: '/apiEventWatcher/:path*',
                destination: `${process.env.EVENT_WATCHER_API}/api/:path*`,
            },
            {
                source: '/lriif/:path*',
                destination: `https://lrx.st/samples/:path*`,
            },
            {
                source: '/lriif_calc/:path*',
                destination: `http://121.67.187.153:8001/calculate/:path*`,
            },
        ]
    },
}

module.exports = nextConfig
