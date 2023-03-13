import "../styles/global.css";
import { usePagesViews } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {
    usePagesViews()
    return (
        <Component {...pageProps} />
    );
}
