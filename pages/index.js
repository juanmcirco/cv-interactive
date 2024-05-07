import Head from "next/head";
import { useState } from "react";

import styles from "./index.module.css";

export default function Home({ passEnv }) {
 
  return (
    <div style={{display:'flex'}}>
      <Head>
        <title>Manu</title>
        <script async type='text/javascript' src="/js/newrelic.js"></script>
        <script async type='text/javascript' src="/js/gtm.js"></script>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>

      <main className={styles.main}>
        Manu
      </main>
    </div>
  );
}

export async function getStaticProps(context) {

  return {
    props: { passEnv: process.env.PASSGENERIC },
  };
}