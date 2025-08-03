"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/images/logo.png";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // true if token exists
    }, []);

    return (
        <header className="px-4 bg-gray-800 py-2 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <Image src={logo} alt="Logo" width={200} className="logo" />
                <nav>
                    <ul className="flex space-x-4 text-white">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link href="/payrolls">Payroll</Link>
                                </li>
                                <li>
                                    <Link href="/attendence">Attendence</Link>
                                </li>
                                <li>
                                    <Link href="/employee">Employee</Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            window.location.href = "/login";
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
