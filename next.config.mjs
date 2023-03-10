/**
   * @type {import('next').NextConfig}
   */
const nextConfig = {
    images: {
        loader: 'akamai',
        path: '',
    },
    assetPrefix: './',
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

export default nextConfig;

