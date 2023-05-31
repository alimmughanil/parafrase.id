import { React, useEffect, useState } from "react";
import SideNavbar from "@/Components/SideNavbar";
import Sidebar from "@/Components/Sidebar";
import { Head, usePage } from "@inertiajs/react";
import VerifyEmail from "@/Components/VerifyEmail";
import { Transition } from "@headlessui/react";

function AuthenticatedLayout({ title, children, open, setOpen, auth }) {
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

    const sidebarMenu = [
        {
            title: "Dashboard",
            src: "fas fa-tachometer-alt fa-fw",
            link: "/dashboard",
        },
        {
            title: "Event",
            src: "fas fa-calendar-day",
            link: "/event",
        },
    ];

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
                    link="/admin/dashboard"
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
