"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function Attendance() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/attendances", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching attendance:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <nav className="mb-4 text-sm text-gray-400">
                <Link href="/" className="hover:underline text-gray-300">Home</Link>
                <span className="mx-2">{">"}</span>
                <span className="text-white">Attendance</span>
            </nav>

            <hr className="border-gray-600 mb-6" />
            <Link href="/attendence/add" className="mb-4 bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold">
                Add Attendance
            </Link>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-600 text-white text-sm">
                    <thead>
                        <tr className="bg-gray-700 text-gray-200">
                            <th className="border border-gray-600 px-4 py-2">Employee</th>
                            <th className="border border-gray-600 px-4 py-2">Designation</th>
                            <th className="border border-gray-600 px-4 py-2">Date</th>
                            <th className="border border-gray-600 px-4 py-2">Clock In</th>
                            <th className="border border-gray-600 px-4 py-2">Clock Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.id}>
                                <td className="border border-gray-600 px-4 py-2">{entry.employee?.name}</td>
                                <td className="border border-gray-600 px-4 py-2">{entry.employee?.designation}</td>
                                <td className="border border-gray-600 px-4 py-2">
                                    {entry.date ? format(parseISO(entry.date), "do MMM yyyy") : "—"}
                                </td>

                                <td className="border border-gray-600 px-4 py-2">
                                    {entry.in_time ? format(parseISO(`${entry.date}T${entry.in_time}`), "h:mm a") : "—"}
                                </td>

                                <td className="border border-gray-600 px-4 py-2">
                                    {entry.out_time ? format(parseISO(`${entry.date}T${entry.out_time}`), "h:mm a") : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
