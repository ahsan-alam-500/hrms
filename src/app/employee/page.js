"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const EMPLOYEES = [
    {
        id: "101",
        name: "John Doe",
        designation: "Web Developer",
        image: "https://i.ibb.co/N2Bz0Jb8/image-14.png",
    },
    {
        id: "102",
        name: "Jane Doe",
        designation: "App Developer",
        image: "https://i.ibb.co/TSWmg14/image-9.png",
    },
    {
        id: "103",
        name: "Ali Khan",
        designation: "Android Developer",
        image: "https://i.ibb.co/N2Bz0Jb8/image-14.png",
    },
    {
        id: "104",
        name: "Sara Ali",
        designation: "Android Developer",
        image: "https://i.ibb.co/N2Bz0Jb8/image-14.png",
    },
];

export default function Page() {
    const [filters, setFilters] = useState({
        name: "",
        id: "",
        designation: "",
    });

    const [filteredEmployees, setFilteredEmployees] = useState(EMPLOYEES);

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        const { name, id, designation } = filters;
        const result = EMPLOYEES.filter((emp) => {
            return (
                (!name || emp.name.toLowerCase().includes(name.toLowerCase())) &&
                (!id || emp.id.includes(id)) &&
                (!designation || emp.designation.toLowerCase() === designation.toLowerCase())
            );
        });
        setFilteredEmployees(result);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm text-gray-400">
                <Link href="/" className="hover:underline text-gray-300">
                    Home
                </Link>
                <span className="mx-2">{">"}</span>
                <span className="text-white">Employee</span>
            </nav>

            <hr className="border-gray-600 mb-6" />

            {/* Filter Form */}
            <div className="bg-gray-800 p-6 rounded-md shadow-md mb-8">
                <form className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4 items-end">
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter employee name"
                        value={filters.name}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="id"
                        type="text"
                        placeholder="Enter employee ID"
                        value={filters.id}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="designation"
                        value={filters.designation}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Designation</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Android Developer">Android Developer</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleFilter}
                            className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                        <div
                            key={emp.id}
                            className="bg-gray-800 p-6 rounded-md shadow-md flex flex-col items-center gap-4 text-center"
                        >
                            <Image
                                src={emp.image}
                                alt={emp.name}
                                width={100}
                                height={100}
                                className="rounded-full object-cover"
                            />
                            <h2 className="text-white text-2xl font-semibold">{emp.name}</h2>
                            <p className="text-gray-400">{emp.designation}</p>

                            <div className="flex space-x-4 text-white text-xl">
                                <FaFacebookF className="p-2 bg-gray-600 text-3xl rounded hover:bg-blue-400 cursor-pointer" />
                                <FaTwitter className="p-2 bg-gray-600 text-3xl rounded hover:bg-blue-400 cursor-pointer" />
                                <FaLinkedinIn className="p-2 bg-gray-600 text-3xl rounded hover:bg-blue-400 cursor-pointer" />
                            </div>

                            .
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button className="w-full sm:w-auto border-1 cursor-pointer hover:bg-gray-600 border-gray-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    View
                                </button>
                                <button className="w-full sm:w-auto border-1 cursor-pointer hover:bg-gray-600 border-gray-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Call
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white col-span-full text-center">No employees found.</div>
                )}
            </div>

            {/* Load More Placeholder */}
            <div className="pt-8 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Load More
                </button>
            </div>
        </div>
    );
}
