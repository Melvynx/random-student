import Head from 'next/head';
import Root from '../components/random/Root';

function Home() {
  return (
    <>
      <Head>
        <title>Random 🧑‍🎓</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Root />
    </>
  );
}

export default Home;
