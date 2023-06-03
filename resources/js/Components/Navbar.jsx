import { React } from "react";
import { Link, usePage } from "@inertiajs/react";

function Navbar({ ...props }) {
    const user = usePage().props.auth.user;
    return (
        <>
            <div className="sticky top-0 left-0 z-[999]">
                <div className="max-w-full shadow navbar bg-base-100 px-4 justify-center md:px-8 lg:px-16">
                    <div className="items-center navbar-start">
                        <Link
                            href="/"
                            className={`normal-case font-semibold text-lg px-0 w-full whitespace-pre hover:font-bold navbar-start duration-300`}
                        >
                            Parafrase ID
                        </Link>
                    </div>
                    <div className="navbar-end duration-500">
                        <div className="mx-2">
                            {user ? (
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
                                                            {user.name}
                                                        </div>
                                                        <p className="text-sm">
                                                            {user.email}
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
                            ) : (
                                <div className="flex gap-2">
                                    <Link
                                        href={route("register")}
                                        className="btn btn-primary btn-sm btn-outline"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
