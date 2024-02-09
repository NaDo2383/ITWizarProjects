/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
    env: {
        NEXT_BACKEND_URL: process.env.BACKEND_URL,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4|webm)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/videos', // Output path for the files
                        publicPath: '/_next/static/videos', // Public URL for the files
                        name: '[name].[ext]', // Name of the output file
                    },
                },
            ],
        })
        return config
    },
    images: {
        domains: ['3.39.36.109'],
    },
}

module.exports = nextConfig
