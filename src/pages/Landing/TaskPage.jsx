import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { AiOutlineDownload } from "react-icons/ai"; // Instal icon: npm install react-icons
import { supabase } from "../../services/supabaseClient";

function TaskPages() {
    const [documents, setDocuments] = useState([]); // State untuk menyimpan data dokumen

    // Fungsi untuk mengambil data dari tabel documents
    const fetchDocuments = async () => {
        const { data, error } = await supabase
            .from("documents")
            .select("*");

        console.log(data);
        if (error) {
            console.error("Error fetching documents:", error.message);
        } else {
            setDocuments(data);
        }

        console.log(documents);

    };

    // Fungsi untuk mengunduh file dari Supabase Storage
    const downloadFile = async (filePath) => {
        const { data, error } = await supabase.storage
            .from("spk") // Ganti dengan nama bucket storage Anda
            .download(filePath);

        if (error) {
            console.error("Error downloading file:", error.message);
        } else {
            // Buat unduhan file di browser
            const url = URL.createObjectURL(data);
            const a = document.createElement("a");
            a.href = url;
            a.download = filePath.split("/").pop(); // Nama file dari path
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-base-200">
                <div className="max-w-screen-xl mx-auto pt-5">
                    <table className="table bg-base-100 text-black">
                        {/* Table Header */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={doc.id}>
                                    <th>{index + 1}</th>
                                    <td>{doc.name}</td>
                                    <td className="text-xs bg-blue-100 text-blue-800 px-1 mt-5 py-0.5 rounded-full inline-block">
                                        Task
                                    </td>
                                    <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => downloadFile(doc.file_path)}
                                            className="btn btn-sm btn-primary  items-center">
                                            <AiOutlineDownload />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default TaskPages;
