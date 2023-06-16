import { React, useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

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
            link: "/?type=paraphrase",
        },
        {
            title: "Rangkuman",
            src: "fas fa-clipboard",
            link: "/?type=correction",
        },
        {
            title: "Perbaikan",
            src: "fas fa-clipboard",
            link: "/?type=correction",
        },
        {
            title: "Terjemahkan",
            src: "fas fa-clipboard",
            link: "/?type=translate",
        },
    ];

    return (
        <>
            <Head title={title} />
            <div className={`flex-1`}>
                <Navbar
                    setOpen={setOpen}
                    open={open}
                    title={title}
                    link="/dashboard"
                    menu={sidebarMenu}
                />
                <div
                    className={`flex flex-row w-full`}
                >
                    <Sidebar
                        menu={sidebarMenu}
                        open={open}
                    />
                    <div className={`bg-gray-200 ${open ? "hidden sm:flex sm:place-items-start w-full" : "flex-1"}`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeLayout;
