/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/variants',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
