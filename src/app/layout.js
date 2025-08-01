import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";

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
        <header className="px-4 bg-gray-800 py-2 sticky top-0">
          <div className="container mx-auto flex justify-between items-center">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              className="logo"
            />
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
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
