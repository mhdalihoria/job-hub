import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "@/components/navbar/Navbar"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Job Hub is a service that provides you with easy access to high quality jobs to get recruited quickly and easily. And for you, as an employer, to find the best candidates in the shortest amount of time possible" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
