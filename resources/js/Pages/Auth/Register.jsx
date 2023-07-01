import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import GoogleAuthButton from "@/Components/GoogleAuthButton";
import RegisterForm from "@/Components/RegisterForm";

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Register" />

            <p className="my-4 text-lg font-bold text-center">
                Create New Account
            </p>
            <GoogleAuthButton />
            <RegisterForm />
        </GuestLayout>
    );
}
