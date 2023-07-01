import { Link } from "@inertiajs/react";
import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Index(props) {
    const [open, setOpen] = useState(false);

    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            <div className="flex flex-wrap items-start justify-center mt-4 gap-x-4 gap-y-8">
                {props.history?.data.length == 0 ? (
                    <div className="flex flex-col w-full h-full gap-2 p-4 border rounded-lg shadow-lg bg-gray-50 sm:w-96">
                        <p className="text-center">
                            Belum ada data yang dapat ditampilkan
                        </p>
                    </div>
                ) : (
                    props.history.data.map((history, i) => {
                        return (
                            <div className="flex flex-col w-full h-full gap-2 p-4 border rounded-lg shadow-lg bg-gray-50 sm:w-96">
                                {history.user ? (
                                    <div>
                                        <h1 className="overflow-auto font-semibold whitespace-pre scrollbar-hide">
                                            {history.user.id}
                                        </h1>
                                        <h2 className="overflow-auto text-gray-600 whitespace-pre scrollbar-hide">
                                            {history.user.name} (
                                            {history.user.email})
                                        </h2>
                                    </div>
                                ) : (
                                    <h1 className="font-semibold">Guest</h1>
                                )}
                                <div className="">
                                    <h2 className="font-semibold">Device</h2>
                                    <p className="text-gray-600">
                                        {history.user_agent}
                                    </p>
                                </div>
                                <div className="">
                                    <h2 className="font-semibold">Prompt</h2>
                                    <p className="text-gray-600">
                                        {history.prompt_text}
                                    </p>
                                </div>
                                <div className="">
                                    <h2 className="font-semibold">Hasil</h2>
                                    <p className="text-gray-600">
                                        {history.result_text}
                                    </p>
                                </div>

                                <div className="flex flex-row items-center justify-between font-medium">
                                    <p>{history.ip_address}</p>
                                    <p>
                                        {new Date(
                                            history.created_at
                                        ).toLocaleString("id-ID", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="flex items-center justify-between w-full pt-2 pb-4">
                <a
                    href="/history?show=all"
                    className={`${
                        location.search == "?show=all"
                            ? "bg-blue-200 rounded-lg"
                            : "bg-transparent"
                    } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                >
                    Show All
                </a>
                {props.history.links ? (
                    <nav aria-label="Pagination of Index Report">
                        <ul className="flex list-style-none">
                            {props.history.links.map((link, i) => {
                                return (
                                    <>
                                        <li key={i} aria-current="page">
                                            <Link
                                                className={`${
                                                    props.history
                                                        .current_page ==
                                                    link.label
                                                        ? "bg-blue-200 rounded-lg"
                                                        : "bg-transparent"
                                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                                                href={`${
                                                    link.url == null
                                                        ? "#"
                                                        : link.url
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    </>
                                );
                            })}
                        </ul>
                    </nav>
                ) : (
                    <Link
                        href="/history?page=1"
                        className={`bg-transparent relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                    >
                        Page 1
                    </Link>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
