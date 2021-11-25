import Head from 'next/head';
import { RandomApp } from '~/components';

function Home() {
  return (
    <>
      <Head>
        <title>Random 🧑‍🎓</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <RandomApp />
    </>
  );
}

export default Home;
