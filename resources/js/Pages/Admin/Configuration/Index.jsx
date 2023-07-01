import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Index(props) {
    const [openModal, setOpenModal] = useState(null);
    const [configurationData, setConfigurationData] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(`/configuration/${configurationData.id}`);
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
                        href="/configuration/create"
                        className="btn btn-primary w-max btn-sm"
                    >
                        Tambah Konfigurasi
                    </Link>
                    <div className="relative w-screen overflow-x-auto sm:w-full">
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
                                            onClick={() => setSortBy("type")}
                                            className={`${
                                                sortBy === "type"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Tipe
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() => setSortBy("value")}
                                            className={`${
                                                sortBy === "value"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Nilai
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() =>
                                                setSortBy("created_at")
                                            }
                                            className={`${
                                                sortBy === "created_at"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Ditambahkan
                                        </button>
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
                                {props.configuration.data.length == 0 ? (
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
                                    props.configuration.data
                                        .sort((a, b) => {
                                            if (sortBy == "type")
                                                return a.type.localeCompare(
                                                    b.type
                                                );
                                            if (sortBy == "value")
                                                return a.value.localeCompare(
                                                    b.value
                                                );
                                            if (sortBy == "created_at")
                                                return a.created_at.localeCompare(
                                                    b.created_at
                                                );

                                            return a.id - b.id;
                                        })
                                        .map((configuration, i) => {
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
                                                        {configuration.type}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {configuration.value}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {new Date(
                                                            configuration.updated_at
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
                                                        className="text-center"
                                                    >
                                                        <Link
                                                            href={`/configuration/${configuration.id}/edit`}
                                                            className="text-lg text-blue-600 btn btn-ghost btn-sm btn-circle"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                props.flash.message =
                                                                    null;
                                                                setOpenModal(
                                                                    "delete"
                                                                );
                                                                setConfigurationData(
                                                                    configuration
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
                                href="/configuration?show=all"
                                className={`${
                                    location.search == "?show=all"
                                        ? "bg-blue-200 rounded-lg"
                                        : "bg-transparent"
                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                            >
                                Show All
                            </a>
                            {props.configuration.links ? (
                                <nav aria-label="Pagination of Index Report">
                                    <ul className="flex list-style-none">
                                        {props.configuration.links.map(
                                            (link, i) => {
                                                return (
                                                    <>
                                                        <li
                                                            key={i}
                                                            aria-current="page"
                                                        >
                                                            <Link
                                                                className={`${
                                                                    props
                                                                        .configuration
                                                                        .current_page ==
                                                                    link.label
                                                                        ? "bg-blue-200 rounded-lg"
                                                                        : "bg-transparent"
                                                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                                                                href={`${
                                                                    link.url ==
                                                                    null
                                                                        ? "#"
                                                                        : link.url
                                                                }`}
                                                            >
                                                                {link.label}
                                                            </Link>
                                                        </li>
                                                    </>
                                                );
                                            }
                                        )}
                                    </ul>
                                </nav>
                            ) : (
                                <Link
                                    href="/configuration?page=1"
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
                            <p>
                                Apakah anda yakin ingin menghapus Konfigurasi
                                ini?
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
