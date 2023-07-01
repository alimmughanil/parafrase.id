import RegisterForm from "@/Components/RegisterForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        type: "",
        instruction: "",
        lang: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value.toString().toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/prompts");
    };

    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            <div className="flex flex-wrap items-center justify-center w-full gap-4 pt-8">
                <div className="flex flex-col items-center justify-center w-full gap-4 p-4 border rounded-lg shadow-lg md:w-96">
                    <RegisterForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
