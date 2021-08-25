import Head from 'next/head'
import Cesar from '../components/Cesar'
export default function Home() {

  return (
      <>
      <Head>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/monokai.min.css"></link>
      </Head>
        <Cesar/>
      </>
  )
}



