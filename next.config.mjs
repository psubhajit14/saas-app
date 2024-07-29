/** @type {import('next').NextConfig} */
const nextConfig = {
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
