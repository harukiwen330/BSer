// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
//  * This is especially useful for Docker builds.
//  */
// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

// /** @type {import("next").NextConfig} */
// const config = {
//   reactStrictMode: true,

//   /**
//    * If you have the "experimental: { appDir: true }" setting enabled, then you
//    * must comment the below `i18n` config out.
//    *
//    * @see https://github.com/vercel/next.js/issues/41980
//    */
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
// };
// export default config;

import {createRequire} from "node:module";
const require = createRequire(import.meta.url);
const withPWA = require("next-pwa")({
    dest: "public"
});

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return config;
}

export default withPWA(
    defineNextConfig({
        reactStrictMode: true,
        swcMinify: true,
        i18n: {
            locales: ["en"],
            defaultLocale: "en"
        }
    })
);
