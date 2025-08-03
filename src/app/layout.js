import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HRMS Sardar IT",
  description: "HRMS Sardar IT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header  */}
        <Header />
        {/* Header ends */}
        {children}
        {/* Footer */}
        <footer className="bg-gray-800 py-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sardar IT Inc. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
