/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites : async () => {
        return [
            {
                source: '/api/fastapi/:path*',
                destination: 
                process.env.NODE_ENV === 'development' ?
                'http://127.0.0.1:8000/api/fastapi/:path*' :
                "/api/fastapi/",
            },
        ]
    }
}
module.exports = nextConfig
