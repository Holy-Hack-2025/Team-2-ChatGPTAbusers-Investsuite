import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="favicon/favicon.ico" />
                <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
