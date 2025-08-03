"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function EmployeeDocumentsPage() {
  const { id } = useParams(); // employee id from URL
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch documents
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8000/api/v1/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDocuments(res.data))
      .catch(() => setDocuments([]));
  }, [id, token]);

  // Upload document handler
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !type) {
      setMessage({ type: "error", text: "Please select document type and file." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      await axios.post(`http://localhost:8000/api/v1/documents/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh documents list
      const res = await axios.get(`http://localhost:8000/api/v1/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
      setType("");
      setFile(null);
      setMessage({ type: "success", text: "Document uploaded successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to upload document." });
    } finally {
      setLoading(false);
    }
  };

  // Delete document handler
  const handleDelete = async (docId) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments((docs) => docs.filter((doc) => doc.id !== docId));
      setMessage({ type: "success", text: "Document deleted." });
    } catch {
      setMessage({ type: "error", text: "Failed to delete document." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-md text-white mt-10">
      <h1 className="text-3xl mb-6 font-semibold">Employee Documents</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${message.type === "error" ? "bg-red-700" : "bg-green-700"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpload} className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          required
        >
          <option value="">Select Document Type</option>
          <option value="CV">CV</option>
          <option value="NID">NID</option>
          <option value="Certificate">Certificate</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-gray-900"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold disabled:bg-blue-400"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded"
            >
              <div>
                <strong>{doc.type}</strong>{" "}
                —{" "}
                <a
                  href={`http://localhost:8000/storage/${doc.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View Document
                </a>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
