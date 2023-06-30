import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GoogleAuthButton from "@/Components/GoogleAuthButton";

export default function Login(props) {
    const { status, canResetPassword } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <p className="my-4 text-lg font-bold text-center">
                Login to your account
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            {props.flash.message ? (
                <div className="h-full mx-auto mb-4 text-center text-white badge badge-error">
                    {props.flash.message}
                </div>
            ) : null}
            <GoogleAuthButton />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-start gap-2 mt-4">
                    <input
                        type="checkbox"
                        name="remember"
                        className="checkbox checkbox-primary checkbox-sm"
                        value={data.remember}
                        onChange={handleOnChange}
                    />
                    <span className="text-gray-600">Remember me</span>
                </div>

                <div className="flex flex-col gap-4 my-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="link-hover"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <div className="flex flex-col">
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={processing}
                        >
                            Login
                        </button>
                        <div className="divider">or</div>
                        <Link
                            href="/register"
                            className="mx-auto btn btn-sm btn-primary btn-outline w-max"
                            disabled={processing}
                        >
                            Create New Account
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
