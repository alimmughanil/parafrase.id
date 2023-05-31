import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: null,
            date_time: null,
        });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/event");
    };

    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            <div className="flex flex-wrap items-center justify-center w-full gap-4 pt-8">
                <form className="flex flex-col items-center justify-center w-full gap-4 p-4 border rounded-lg shadow-lg md:w-96">
                    {props.flash.message ? (
                        <div className="text-center badge badge-primary badge-outline h-max">
                            {props.flash.message}
                        </div>
                    ) : null}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Nama Event</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan nama event disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                        />
                        {errors.name && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.name}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">
                                Tanggal dan Waktu
                            </span>
                        </label>
                        <input
                            type="datetime-local"
                            placeholder="Masukkan waktu event disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="date_time"
                            value={data.date_time}
                        />
                        {errors.date_time && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.date_time}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => history.back()}
                            className="btn btn-primary btn-outline btn-sm"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className={`btn btn-primary btn-sm ${
                                processing && "loading"
                            }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
