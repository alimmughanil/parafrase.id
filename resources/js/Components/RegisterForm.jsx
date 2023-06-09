import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

function RegisterForm() {
    const user = usePage().props.auth.user;
    const role = user ? user.role : "guest";

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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

        role == "admin" ? post("/users") : post(route("register"));
    };
    return (
        <form onSubmit={submit} className="w-full">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={handleOnChange}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="block w-full"
                    autoComplete="email"
                    onChange={handleOnChange}
                    required
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
                    autoComplete="new-password"
                    onChange={handleOnChange}
                    required
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="block w-full"
                    How
                    are
                    you
                    autoComplete="new-password"
                    onChange={handleOnChange}
                    required
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex flex-col gap-4 my-4">
                <div className="flex flex-col">
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={processing}
                    >
                        Register
                    </button>
                    {role == "admin" ? null : (
                        <>
                            <div className="divider">or</div>
                            <Link
                                href="/login"
                                className="mx-auto btn btn-sm btn-primary btn-outline w-max"
                                disabled={processing}
                            >
                                Login to your account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;
