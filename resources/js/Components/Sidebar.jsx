import LogoutModal from "@/Components/LogoutModal";
import { Link } from "@inertiajs/react";

function Sidebar(props) {
    return (
        <>
            {/* Sidebar */}
            <div
                className={` ${
                    props.open
                        ? "md:w-64 w-96 block"
                        : "hidden lg:w-20 lg:flex lg:items-center lg:flex-col"
                } bg-white min-h-screen relative duration-300 sm:duration-300 border-r shadow-lg`}
            >
                <div className="sticky top-0 left-0">
                    <div className="flex items-center justify-center">
                        <Link
                            href="/"
                            className={`ease-in-out border px-4 py-2 rounded-lg bg-green-500 text-white mx-auto ${
                                props.open
                                    ? "mt-4 font-semibold"
                                    : "mt-2 text-2xl font-bold"
                            }`}
                        >
                            <span>{props.open ? "Laravel React" : "LR"}</span>
                        </Link>
                    </div>
                    <ul className="p-5 pt-6">
                        {props.menu.map((item, i) => (
                            <li
                                key={i}
                                className={`rounded-md ${
                                    !props.open && "w-11 duration-300"
                                } `}
                            >
                                <Link href={item.link}>
                                    <div
                                        className={`${
                                            props.title === item.title &&
                                            "text-gray-900"
                                        } grid items-center grid-cols-8 p-2 mt-2 text-lg text-center text-gray-500 rounded-md cursor-pointer hover:scale-105 hover:text-gray-700 gap-x-8`}
                                    >
                                        <i
                                            className={`${item.src}  ${
                                                !props.open &&
                                                "fa-2x duration-300 w-full"
                                            }`}
                                        ></i>
                                        <span
                                            className={`${
                                                !props.open &&
                                                "hidden duration-1000"
                                            } origin-left duration-1000 whitespace-pre`}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li
                            className={`rounded-md ${
                                !props.open && "w-11 duration-300"
                            } `}
                        >
                            <a href="#logout-confirm">
                                <div className="grid items-center grid-cols-8 p-2 mt-2 text-lg text-gray-500 rounded-md cursor-pointer hover:scale-105 hover:text-gray-800 gap-x-8">
                                    <i
                                        className={`fas fa-sign-out-alt ${
                                            !props.open && "fa-2x duration-300"
                                        }`}
                                    ></i>
                                    <span
                                        className={`${
                                            !props.open &&
                                            "hidden duration-1000"
                                        } origin-left duration-1000`}
                                    >
                                        Logout
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <LogoutModal />
        </>
    );
}

export default Sidebar;
