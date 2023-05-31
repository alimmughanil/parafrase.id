import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: props.event.name,
            date_time: props.event.date_time,
            status: props.event.status,
        });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/event/${props.event.id}`);
    };

    return (
        <AuthenticatedLayout
            title={props.title}
            open={open}
            setOpen={setOpen}
            auth={props.auth}
        >
            <div className="flex items-center justify-center w-full gap-4 pt-8">
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
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Ganti Status</span>
                        </label>
                        <select
                            className="select select-bordered"
                            onChange={handleChange}
                            name="status"
                            defaultValue={data.status}
                        >
                            <option value="">Pilih salah satu</option>
                            <option value="active">Active</option>
                            <option value="nonactive">Nonactive</option>
                        </select>
                        <label className="label">
                            <span className="label-text-alt">
                                Ganti status event akan berdampak pada tiket
                                fisik dan digital
                            </span>
                        </label>
                        {errors.status && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.status}
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
