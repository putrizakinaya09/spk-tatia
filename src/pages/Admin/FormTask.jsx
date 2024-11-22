import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

function UploadForm() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!name || !date || !file) {
            setMessage("All fields are required!");
            setLoading(false);
            return;
        }

        try {
            // Upload file to Supabase storage
            const filePath = `uploads/${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from("spk")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Save metadata in the database (optional)
            const { error: dbError } = await supabase.from("documents").insert([
                {
                    name: name,
                    date: date,
                    file_path: filePath,
                },
            ]);

            if (dbError) {
                throw dbError;
            }

            setMessage("File uploaded successfully!");
            setName("");
            setDate("");
            setFile(null);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <form
                className="w-full max-w-md p-6 bg-base-100 shadow rounded"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Upload Form</h2>

                {/* Input Name */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Input Date */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Input File */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Document</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control">
                    <button
                        type="submit"
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Submit"}
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <p
                        className={`mt-4 text-center ${message.startsWith("Error") ? "text-error" : "text-success"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default UploadForm;
