import LogoutModal from "@/Components/LogoutModal";
import { Link } from "@inertiajs/react";

function Sidebar(props) {
    return (
        <>
            <div
                className={` ${props.open
                    ? "md:w-64 w-96 block"
                    : "hidden lg:w-20 lg:flex lg:items-center lg:flex-col"
                    } bg-white min-h-screen relative duration-300 sm:duration-300 border-r shadow-lg`}
            >
                <div className="sticky top-0 left-0">
                    <ul className="p-5">
                        {props.menu.map((item, i) => (
                            <li
                                key={i}
                                className={`rounded-md ${!props.open && "w-11 duration-300"
                                    } `}
                            >
                                <Link href={item.link}>
                                    <div
                                        className={`${props.title === item.title &&
                                            "text-gray-900"
                                            } grid items-center grid-cols-8 p-2 mt-2 text-lg text-center text-gray-500 rounded-md cursor-pointer hover:scale-105 hover:text-gray-700 gap-x-8`}
                                    >
                                        <i
                                            className={`${item.src}  ${!props.open &&
                                                "fa-2x duration-300 w-full"
                                                }`}
                                        ></i>
                                        <span
                                            className={`${!props.open &&
                                                "hidden duration-1000"
                                                } origin-left duration-1000 whitespace-pre`}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <LogoutModal />
        </>
    );
}

export default Sidebar;
