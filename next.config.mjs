/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "store.istad.co"
            },{
                hostname: "cambodia.mom-gmr.org"
            },{
                hostname:"hips.hearstapps.com"
            }
        ]
    }
};
export default nextConfig;
