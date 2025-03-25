import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/api/image/**',
        },
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: '',
                    },
                ],
            },
        ]
    }
}

export default nextConfig;
