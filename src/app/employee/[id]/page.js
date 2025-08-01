"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Employee not found");
                    return res.json();
                })
                .then((data) => {
                    setEmployee({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        username: data.username,
                        website: data.website,
                        company: data.company.name,
                        city: data.address.city,
                        designation: data.company.bs.includes("web") ? "Web Developer" : "Android Developer",
                        image: "https://i.ibb.co/N2Bz0Jb8/image-14.png",
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="text-white p-4">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-10 text-white">
            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-gray-400">
                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/employee" className="text-blue-500 hover:underline">Employee List</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{employee.name}</span>
            </div>
            <Link href="/employee" className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Back to Employee List</Link>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800 p-8 rounded-lg shadow-lg">

                {/* Left Column - Image & Name */}
                <div className="flex flex-col items-center text-center border-r border-gray-600 pr-6">
                    <Image
                        src={employee.image}
                        alt={employee.name}
                        width={150}
                        height={150}
                        className="rounded-full object-cover"
                    />
                    <h1 className="text-3xl font-bold mt-4">{employee.name}</h1>
                    <p className="text-gray-400">{employee.designation}</p>
                    <p className="text-gray-500 mt-2">{employee.company}</p>
                </div>

                {/* Right Column - Info */}
                <div className="grid gap-4 text-left">
                    <h2 className="text-2xl font-semibold mb-2">Employee Details</h2>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p className="font-semibold text-gray-400">Employee ID:</p>
                        <p>{employee.id}</p>

                        <p className="font-semibold text-gray-400">Username:</p>
                        <p>{employee.username}</p>

                        <p className="font-semibold text-gray-400">Email:</p>
                        <p>{employee.email}</p>

                        <p className="font-semibold text-gray-400">Phone:</p>
                        <p>{employee.phone}</p>

                        <p className="font-semibold text-gray-400">Website:</p>
                        <p>{employee.website}</p>

                        <p className="font-semibold text-gray-400">City:</p>
                        <p>{employee.city}</p>

                        <p className="font-semibold text-gray-400">Company:</p>
                        <p>{employee.company}</p>

                        <p className="font-semibold text-gray-400">Designation:</p>
                        <p>{employee.designation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
