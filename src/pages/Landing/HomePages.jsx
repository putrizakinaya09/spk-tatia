import React from "react";
import Navbar from "../../components/Navbar";

function HomePages() {
    return (
        <>
            <Navbar /> {/* Make sure to close the Navbar component */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div>
                        <h1 className="text-5xl font-bold">Halaman Utama</h1>
                        <p className="py-6">
                            Ini adalah halaman utama untuk web pengumpulan tugas Mata Kuliah SPK.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePages;
