import { React, useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
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
            src: "fas fa-paragraph",
            link: "/?type=paraphrase",
        },
        {
            title: "Rangkuman",
            src: "fas fa-align-left",
            link: "/?type=summerize",
        },
        {
            title: "Perbaikan",
            src: `fas fa-spell-check ${!open ? "scale-[0.9]" : ""}`,
            link: "/?type=correction",
        },
        {
            title: "Terjemahkan",
            src: `fas fa-language ${!open ? "scale-[0.85]" : ""}`,
            link: "/?type=translate",
        },
    ];

    return (
        <>
            <Head title={title} />
            <div className={`flex-1 relative`}>
                <Navbar
                    setOpen={setOpen}
                    open={open}
                    title={title}
                    link="/dashboard"
                    menu={sidebarMenu}
                />
                <div className={`flex flex-row w-full`}>
                    <Sidebar menu={sidebarMenu} open={open} />
                    <div
                        className={`bg-gray-200 ${
                            open
                                ? "hidden sm:flex sm:place-items-start w-full"
                                : "flex-1"
                        }`}
                    >
                        {children}
                        <div className="absolute bottom-0 px-4">
                            <p className="text-sm text-gray-700">
                                Disclaimer: Parafrase.ID merupakan tools yang
                                dibuat dengan AI. kami tidak bertanggung jawab
                                terkait hak cipta konten dalam bentuk apapun
                                jika terdapat kemiripan dengan milik Anda.
                            </p>
                            <footer className="text-center">
                                <Link href="/" className="link-hover">
                                    parafrase.id
                                </Link>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeLayout;
