import { React, useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";

function HomeLayout({ title, children }) {
    const flashMessage = usePage().props.flash.message;
    const [isFlash, setIsFlash] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (flashMessage) {
            setIsFlash(true);
            setTimeout(() => {
                setIsFlash(false);
            }, 3000);
        }
    }, [flashMessage]);

    const sidebarMenu = [
        {
            title: "Parafrase",
            src: "fas fa-clipboard",
            link: "/",
        },
        {
            title: "Rangkuman",
            src: "fas fa-clipboard",
            link: "/summerization",
        },
        {
            title: "Perbaikan",
            src: "fas fa-clipboard",
            link: "/",
        },
        {
            title: "Terjemahkan",
            src: "fas fa-clipboard",
            link: "/",
        },
    ];

    return (
        <>
            <Head title={title} />
            <div className={`min-h-screen flex-1`}>
                <Navbar
                    setOpen={setOpen}
                    open={open}
                    title={title}
                    link="/dashboard"
                />
                <div
                    className={`px-4 py-2 sm:px-6 sm:py-4 relative w-screen overflow-hidden sm:w-full`}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default HomeLayout;
