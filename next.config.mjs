/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'api.unsplash.com',
            port: '',
            pathname: '/**/*',
        }],
    },
};

export default nextConfig;
