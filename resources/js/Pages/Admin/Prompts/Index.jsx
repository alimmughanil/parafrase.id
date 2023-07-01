import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Index(props) {
    const [openModal, setOpenModal] = useState(null);
    const [additionalPrompt, setAdditionalPrompt] = useState(null);
    const [promptData, setPromptData] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(`/prompts/${promptData.id}`);
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
                        href="/prompts/create"
                        className="btn btn-primary w-max btn-sm"
                    >
                        Tambah Prompt
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
                                            onClick={() => setSortBy("lang")}
                                            className={`${
                                                sortBy === "lang"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Bahasa
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() =>
                                                setSortBy("instruction")
                                            }
                                            className={`${
                                                sortBy === "instruction"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Instruksi
                                        </button>
                                    </th>

                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() =>
                                                setSortBy("additional")
                                            }
                                            className={`${
                                                sortBy === "additional"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Tambahan
                                        </button>
                                    </th>
                                    <th scope="col" className="text-center">
                                        <button
                                            onClick={() =>
                                                setSortBy("updated_at")
                                            }
                                            className={`${
                                                sortBy === "updated_at"
                                                    ? "bg-primary text-gray-100 px-2 rounded-lg font-normal"
                                                    : ""
                                            }`}
                                        >
                                            Diupdate
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
                                {props.prompt.data.length == 0 ? (
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
                                    props.prompt.data
                                        .sort((a, b) => {
                                            if (sortBy == "type")
                                                return a.type.localeCompare(
                                                    b.type
                                                );
                                            if (sortBy == "lang")
                                                return a.lang.localeCompare(
                                                    b.lang
                                                );
                                            if (sortBy == "instruction")
                                                return a.instruction.localeCompare(
                                                    b.instruction
                                                );
                                            if (sortBy == "additional") {
                                                return a.additional?.localeCompare(
                                                    b.additional
                                                );
                                            }
                                            if (sortBy == "updated_at")
                                                return a.updated_at.localeCompare(
                                                    b.updated_at
                                                );

                                            return a.id - b.id;
                                        })
                                        .map((prompt, i) => {
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
                                                        {prompt.type}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {prompt.lang}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {prompt.instruction}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {prompt.additional ? (
                                                            <label
                                                                onClick={() => {
                                                                    setPromptData(
                                                                        prompt
                                                                    );
                                                                    setAdditionalPrompt(
                                                                        JSON.parse(
                                                                            prompt.additional
                                                                        )
                                                                    );
                                                                }}
                                                                htmlFor={
                                                                    prompt.id
                                                                }
                                                                className="text-lg text-blue-600 btn btn-ghost btn-sm"
                                                            >
                                                                Lihat
                                                            </label>
                                                        ) : (
                                                            <p>Tidak ada</p>
                                                        )}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {new Date(
                                                            prompt.updated_at
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
                                                            href={`/prompts/${prompt.id}/edit`}
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
                                                                setPromptData(
                                                                    prompt
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
                                href="/prompts?show=all"
                                className={`${
                                    location.search == "?show=all"
                                        ? "bg-blue-200 rounded-lg"
                                        : "bg-transparent"
                                } relative block rounded py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                            >
                                Show All
                            </a>
                            {props.prompt.links ? (
                                <nav aria-label="Pagination of Index Report">
                                    <ul className="flex list-style-none">
                                        {props.prompt.links.map((link, i) => {
                                            return (
                                                <>
                                                    <li
                                                        key={i}
                                                        aria-current="page"
                                                    >
                                                        <Link
                                                            className={`${
                                                                props.prompt
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
                                    href="/prompts?page=1"
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
                            <p>Apakah anda yakin ingin menghapus prompt ini?</p>
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

            <input
                type="checkbox"
                id={promptData?.id}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">
                        <span className="capitalize">{promptData?.type} </span>
                        <span className="uppercase">{promptData?.lang}</span>
                    </h3>
                    <p>
                        {additionalPrompt?.conjunction.from}{" "}
                        {additionalPrompt?.translate.from}{" "}
                        {additionalPrompt?.conjunction.to}{" "}
                        {additionalPrompt?.translate.to}
                    </p>
                    <div className="modal-action">
                        <label
                            onClick={() => setAdditionalPrompt(null)}
                            htmlFor={promptData?.id}
                            className="btn"
                        >
                            Tutup
                        </label>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
