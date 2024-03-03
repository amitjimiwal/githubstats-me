import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";
const inter = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Github Wrapped",
  description: "Generate your Wrapped at the end of the year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics measurementId="G-DTL3T2BXFQ" />
        {/* only display on home page */}
        <Navbar />
        {children}
        <Footer />
        <Modal />
      </body>
    </html>
  );
}
