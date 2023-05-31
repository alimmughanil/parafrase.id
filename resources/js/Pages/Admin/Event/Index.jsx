import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Index(props) {
    const [openModal, setOpenModal] = useState(null);
    const [eventData, setEventData] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(`/event/${eventData.id}`);
    };
    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            {!openModal && (
                <div className="flex flex-col items-center justify-center gap-4 mt-4">
                    <Link
                        href="/event/create"
                        className="btn btn-primary w-max btn-sm"
                    >
                        Tambah Event
                    </Link>
                    <div className="relative overflow-x-auto">
                        <table className="table w-full table-compact">
                            <thead className="">
                                <tr>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() => setSortBy("id")}
                                            className={`${
                                                sortBy === "id"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            #
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() => setSortBy("name")}
                                            className={`${
                                                sortBy === "name"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Nama
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() =>
                                                setSortBy("date_time")
                                            }
                                            className={`${
                                                sortBy === "date_time"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Waktu
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() => setSortBy("status")}
                                            className={`${
                                                sortBy === "status"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Status
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center normal-case"
                                    >
                                        Tiket Digital
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center normal-case"
                                    >
                                        Tiket Fisik
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-center normal-case"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.event.data.length == 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-8 text-center "
                                        >
                                            <p>
                                                Belum ada data yang dapat
                                                ditampilkan
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    props.event.data
                                        .sort((a, b) => {
                                            if (sortBy == "name")
                                                return a.name.localeCompare(
                                                    b.name
                                                );
                                            if (sortBy == "date_time")
                                                return a.date_time.localeCompare(
                                                    b.date_time
                                                );
                                            if (sortBy == "status")
                                                return a.status.localeCompare(
                                                    b.status
                                                );
                                            return a.id - b.id;
                                        })
                                        .map((event, i) => {
                                            return (
                                                <tr
                                                    key={i}
                                                    className="bg-white border-b"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {i + 1}
                                                    </th>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {event.name}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {new Date(
                                                            event.date_time
                                                        ).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                dateStyle:
                                                                    "medium",
                                                                timeStyle:
                                                                    "short",
                                                            }
                                                        )}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center capitalize"
                                                    >
                                                        {event.status ==
                                                        "active" ? (
                                                            <div className="badge badge-sm badge-success badge-outline">
                                                                {event.status}
                                                            </div>
                                                        ) : null}
                                                        {event.status ==
                                                        "nonactive" ? (
                                                            <div className="badge badge-sm badge-error badge-outline">
                                                                {event.status}
                                                            </div>
                                                        ) : null}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        <div className="flex flex-col justify-center gap-2 items-center">
                                                            <Link
                                                                href={`/digital-ticket?event_id=${event.id}`}
                                                                className="btn btn-xs btn-primary w-full"
                                                            >
                                                                Lihat
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        <div className="flex flex-col justify-center gap-2 items-center">
                                                            <Link
                                                                href={`/physical-ticket?event_id=${event.id}`}
                                                                className="btn btn-xs btn-primary w-full"
                                                            >
                                                                Lihat
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        <Link
                                                            href={`/event/${event.id}/edit`}
                                                            className="text-lg text-blue-600 btn btn-ghost btn-sm btn-circle"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setOpenModal(
                                                                    "delete"
                                                                );
                                                                setEventData(
                                                                    event
                                                                );
                                                            }}
                                                            className="text-lg text-red-600 btn btn-ghost btn-sm btn-circle"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                )}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between w-full pt-2 pb-4">
                            <a
                                href="/digital-ticket?show=all"
                                className={`${
                                    location.search == "?show=all"
                                        ? "bg-blue-200 rounded-lg"
                                        : "bg-transparent"
                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                            >
                                Show All
                            </a>
                            {props.event.links ? (
                                <nav aria-label="Pagination of Index Report">
                                    <ul className="flex list-style-none">
                                        {props.event.links.map((link, i) => {
                                            return (
                                                <>
                                                    <li
                                                        key={i}
                                                        aria-current="page"
                                                    >
                                                        <Link
                                                            className={`${
                                                                props.event
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
                                    href="/digital-ticket?page=1"
                                    className={`bg-transparent relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Page 1
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {openModal == "delete" && (
                <div className="flex items-center justify-center w-full gap-4 pt-8">
                    <form className="flex flex-col items-center justify-center w-full gap-4 p-4 border rounded-lg shadow-lg md:w-96">
                        <div className="">
                            <p>Apakah anda yakin ingin menghapus event ini?</p>
                            <p className="mt-4 font-bold text-center text-error">
                                Perhatian!
                            </p>
                            <p className="text-sm text-center">
                                Tiket digital dan tiket fisik yang berelasi
                                dengan event ini juga akan terhapus
                            </p>
                        </div>
                        {props.flash.message ? (
                            <div className="text-center badge badge-primary badge-outline h-max">
                                {props.flash.message}
                            </div>
                        ) : null}
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => location.reload()}
                                className="btn btn-outline btn-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className={`btn btn-error btn-sm ${
                                    processing && "loading"
                                }`}
                            >
                                Hapus
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

export default Index;
