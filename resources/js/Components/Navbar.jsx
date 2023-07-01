import { React } from "react";
import { Link, usePage } from "@inertiajs/react";
import UpgradeButton from "./UpgradeButton";

function Navbar({ ...props }) {
    const user = usePage().props.auth.user;
    const role = user ? user.role : "guest";
    return (
        <>
            <div className="sticky top-0 left-0 z-[999]">
                <div className="justify-center max-w-full px-4 shadow navbar bg-base-100">
                    <div className="items-center gap-2 navbar-start">
                        <button
                            onClick={() => props.setOpen((state) => !state)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link
                            href="/"
                            className={`normal-case font-semibold text-lg px-0 w-full whitespace-pre hover:font-bold navbar-start duration-300`}
                        >
                            Parafrase ID
                        </Link>
                    </div>
                    <div className="duration-500 navbar-end">
                        <div
                            className={`hidden sm:inline-flex ${
                                role == "admin" ? "sm:hidden" : ""
                            }`}
                        >
                            <UpgradeButton />
                        </div>
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
                                            <div className="flex flex-col items-start justify-center gap-y-6">
                                                <div className="flex flex-row items-start gap-x-3 overflow-auto w-[72vw] sm:w-80 scrollbar-hide">
                                                    <div className="avatar">
                                                        <div className="w-10 h-10 border-2 rounded-full">
                                                            <img
                                                                src={`/image/user.png`}
                                                                alt="Akun"
                                                                width="100px"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="font-bold overflow-auto w-[60vw] sm:w-72 whitespace-pre scrollbar-hide">
                                                            {user.name}
                                                        </div>
                                                        <p className="text-sm overflow-auto w-[60vw] sm:w-72 whitespace-pre scrollbar-hide">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="self-center w-full">
                                                    <UpgradeButton
                                                        show={true}
                                                    />
                                                </div>
                                                <div className="flex flex-row items-center justify-around w-full">
                                                    <Link
                                                        className="text-gray-700 cursor-pointer hover:text-primary"
                                                        href="/"
                                                    >
                                                        <i className="fas fa-2x fa-home"></i>
                                                    </Link>
                                                    {role == "admin" ? (
                                                        <Link
                                                            className="text-gray-700 cursor-pointer hover:text-primary"
                                                            href="/dashboard"
                                                        >
                                                            <i className="fas fa-2x fa-tachometer-alt fa-fw"></i>
                                                        </Link>
                                                    ) : null}

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
