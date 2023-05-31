import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

function Index(props) {
    const [open, setOpen] = useState(false);
    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            <div className="flex flex-col items-center justify-center gap-4 pt-8">
                <p>
                    Selamat Datang,{" "}
                    <span className="font-semibold">
                        {props.auth.user.name}
                    </span>
                </p>


            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
