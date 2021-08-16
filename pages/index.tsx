import Head from 'next/head'
import Image from 'next/image'
import Cesar from '../components/Cesar'
import styles from '../styles/Home.module.css'
export default function Home() {

  return (
      <>
      <Head>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/monokai.min.css"></link>
          <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
      </Head>
        <Cesar/>
      </>
  )
}


