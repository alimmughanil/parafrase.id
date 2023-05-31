import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col justify-center items-center gap-2">
                <p>Selamat datang</p>
                <div className="flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="btn btn-primary btn-sm"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="btn btn-primary btn-sm"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="btn btn-primary btn-sm btn-outline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
