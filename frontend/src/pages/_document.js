import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-gray-950">
        <Navbar />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
