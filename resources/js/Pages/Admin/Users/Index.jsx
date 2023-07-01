import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Index(props) {
    const [openModal, setOpenModal] = useState(null);
    const [userData, setUserData] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(`/users/${userData.id}`);
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
                        href="/users/create"
                        className="btn btn-primary w-max btn-sm"
                    >
                        Tambah Pengguna
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
                                            onClick={() => setSortBy("email")}
                                            className={`${
                                                sortBy === "email"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Email
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() => setSortBy("role")}
                                            className={`${
                                                sortBy === "role"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Role
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
                                            onClick={() =>
                                                setSortBy("created_at")
                                            }
                                            className={`${
                                                sortBy === "created_at"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Dibuat
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center normal-case"
                                    >
                                        Riwayat
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
                                {props.users.data.length == 0 ? (
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
                                    props.users.data
                                        .sort((a, b) => {
                                            if (sortBy == "name")
                                                return a.name.localeCompare(
                                                    b.name
                                                );
                                            if (sortBy == "email")
                                                return a.email.localeCompare(
                                                    b.email
                                                );
                                            if (sortBy == "role")
                                                return a.role.localeCompare(
                                                    b.role
                                                );
                                            if (sortBy == "type")
                                                return a.type.localeCompare(
                                                    b.type
                                                );
                                            if (sortBy == "created_at")
                                                return a.created_at.localeCompare(
                                                    b.created_at
                                                );
                                            if (sortBy == "status")
                                                return a.status.localeCompare(
                                                    b.status
                                                );
                                            return a.id - b.id;
                                        })
                                        .map((user, i) => {
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
                                                        {user.name}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {user.email}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {user.role}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {user.type}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {new Date(
                                                            user.created_at
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
                                                            href={`/history/${user.id}`}
                                                            className="text-lg text-blue-600 btn btn-ghost btn-sm"
                                                        >
                                                            Lihat
                                                        </Link>
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                            className="text-lg text-blue-600 btn btn-outline btn-xs btn-circle"
                                                        >
                                                            <i className="fas fa-arrow-up"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                props.flash.message =
                                                                    null;
                                                                setOpenModal(
                                                                    "delete"
                                                                );
                                                                setUserData(
                                                                    user
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
                                href="/users?show=all"
                                className={`${
                                    location.search == "?show=all"
                                        ? "bg-blue-200 rounded-lg"
                                        : "bg-transparent"
                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                            >
                                Show All
                            </a>
                            {props.users.links ? (
                                <nav aria-label="Pagination of Index Report">
                                    <ul className="flex list-style-none">
                                        {props.users.links.map((link, i) => {
                                            return (
                                                <>
                                                    <li
                                                        key={i}
                                                        aria-current="page"
                                                    >
                                                        <Link
                                                            className={`${
                                                                props.users
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
                                    href="/users?page=1"
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
                                Apakah anda yakin ingin menghapus pengguna ini?
                            </p>
                            <p className="mt-4 font-bold text-center text-error">
                                Perhatian!
                            </p>
                            <p className="text-sm text-center">
                                Segala aktivitas pengguna ini juga akan ikut
                                terhapus
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
