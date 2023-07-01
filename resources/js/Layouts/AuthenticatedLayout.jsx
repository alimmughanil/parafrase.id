import { React, useEffect, useState } from "react";
import SideNavbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { Head, usePage } from "@inertiajs/react";
import VerifyEmail from "@/Components/VerifyEmail";
import { Transition } from "@headlessui/react";

function AuthenticatedLayout({ title, children, open, setOpen, auth }) {
    const user = usePage().props.auth.user;
    const role = user ? user.role : "guest";

    const flashMessage = usePage().props.flash.message;
    const [isFlash, setIsFlash] = useState(false);

    useEffect(() => {
        if (flashMessage) {
            setIsFlash(true);
            setTimeout(() => {
                setIsFlash(false);
            }, 3000);
        }
    }, [flashMessage]);
    let sidebarMenu = [];

    if (role == "admin") {
        sidebarMenu = [
            {
                title: "Dashboard",
                src: "fas fa-tachometer-alt fa-fw",
                link: "/dashboard",
            },
            {
                title: "Users",
                src: "fas fa-users",
                link: "/users",
            },
            {
                title: "Prompts",
                src: "fas fa-list",
                link: "/prompts",
            },
            {
                title: "History",
                src: "fas fa-clock-rotate-left",
                link: "/history",
            },
            {
                title: "Configuration",
                src: "fas fa-gear",
                link: "/configuration",
            },
        ];
    }

    return (
        <div className="flex">
            <Head title={title} />
            <Sidebar
                title={title}
                open={open}
                setOpen={setOpen}
                menu={sidebarMenu}
            />
            <div
                className={` ${
                    open ? "w-16 sm:block sm:w-full" : "block"
                } min-h-screen flex-1`}
            >
                <SideNavbar
                    setOpen={setOpen}
                    open={open}
                    title={title}
                    auth={auth}
                    link="/"
                />
                <div
                    className={`${
                        open && "hidden md:block"
                    } px-3 py-2 sm:px-6 sm:py-4 relative w-screen sm:w-full`}
                >
                    {flashMessage && (
                        <Transition
                            show={isFlash}
                            enterFrom="opacity-0"
                            leaveTo="opacity-10"
                            className="transition ease-in-out"
                        >
                            <div className="absolute px-1 z-[100] badge badge-primary badge-outline h-max text-center md:px-4 md:py-2 md:top-4 md:right-4">
                                {flashMessage}
                            </div>
                        </Transition>
                    )}

                    {!auth.user.email_verified_at && auth.user.role === 0 ? (
                        <VerifyEmail user={auth.user} />
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthenticatedLayout;
