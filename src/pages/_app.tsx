import {type AppType} from "next/app";

import {api} from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>BSer</title>
                <meta name="theme-color" content="#12aaaa" />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default api.withTRPC(MyApp);
