/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "store.istad.co"
            }, {
                hostname: "cambodia.mom-gmr.org"
            }, {
                hostname: "hips.hearstapps.com"
            },
            {
                hostname: 'assets.example.com',
            },

        ],
        domains: ['fakestoreapi.com', "i.pinimg.com", "t4.ftcdn.net", "assets.vogue.com"],
    }
};
export default nextConfig;
