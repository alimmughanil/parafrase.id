import { React } from "react";
import { Link } from "@inertiajs/react";

function SideNavbar({ ...props }) {
    return (
        <div className="sticky top-0 left-0 z-[999]">
            <div className="top-0 left-0 right-0 max-w-full shadow-lg navbar bg-base-100">
                <div className="items-center navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className={`btn btn-ghost hover:bg-slate-50 btn-circle 
                            }`}
                            onClick={() => props.setOpen((state) => !state)}
                        >
                            {!props.open ? (
                                <i className="fa-solid fa-bars fa-2x"></i>
                            ) : (
                                <i className="fa-solid fa-2x fa-circle-arrow-right"></i>
                            )}
                        </label>
                    </div>
                    <Link
                        href={props.Link}
                        className={`normal-case font-semibold text-lg px-0 w-full whitespace-pre hover:font-bold ${
                            props.open
                                ? "hidden duration-300 sm:flex sm:navbar-start"
                                : "navbar-start duration-300"
                        }`}
                    >
                        {props.title}
                    </Link>
                </div>
                <div
                    className={` ${
                        props.open
                            ? "hidden duration-500 sm:flex sm:navbar-end"
                            : "navbar-end duration-500"
                    }`}
                >
                    <div className="mx-2">
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 normal-case border-2 rounded-full">
                                    <img
                                        src={`/image/user.png`}
                                        alt="Akun"
                                        width="100px"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="p-2 mt-3 shadow dropdown-content bg-base-100 rounded-box w-max"
                            >
                                <li className="p-4 h-max">
                                    <div className="flex flex-col items-center justify-center gap-y-6">
                                        <div className="flex flex-row items-start gap-x-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 border-2 rounded-full">
                                                    <img
                                                        src={`/image/user.png`}
                                                        alt="Akun"
                                                        width="100px"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <div className="font-bold">
                                                    {props.auth.user.name}
                                                </div>
                                                <p className="text-sm">
                                                    {props.auth.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <Link
                                                className="text-gray-700 cursor-pointer hover:text-primary"
                                                href="/"
                                            >
                                                <i className="fas fa-2x fa-home"></i>
                                            </Link>
                                            <Link
                                                className="text-gray-700 cursor-pointer hover:text-primary"
                                                href={`/profile`}
                                            >
                                                <i className="fas fa-2x fa-gear"></i>
                                            </Link>
                                            <a
                                                className="text-gray-700 cursor-pointer hover:text-primary"
                                                href="#logout-confirm"
                                            >
                                                <i className="fas fa-2x fa-sign-out-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
