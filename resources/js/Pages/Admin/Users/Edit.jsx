import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, errors, processing } = useForm({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        status: props.user.status,
        type: props.user.type,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value.toString().toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${props.user.id}`);
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
                    <p className="text-lg font-semibold">Update Pengguna</p>

                    {props.flash.message ? (
                        <div className="text-center badge badge-primary badge-outline h-max">
                            {props.flash.message}
                        </div>
                    ) : null}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">ID</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan ID disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="id"
                            value={data.id}
                            readOnly={true}
                        />
                        {errors.id && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.id}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Nama</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan nama disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                            readOnly={true}
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
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan email disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="email"
                            value={data.email}
                            readOnly={true}
                        />
                        {errors.email && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.email}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select
                            className="w-full select select-bordered"
                            onChange={handleChange}
                            name="status"
                            defaultValue={data.status}
                        >
                            <option value="">Pilih salah satu</option>
                            <option value="active">Active</option>
                            <option value="nonactive">Nonactive</option>
                        </select>

                        {errors.status && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.status}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Tipe</span>
                        </label>
                        <select
                            className="w-full select select-bordered"
                            onChange={handleChange}
                            name="type"
                            defaultValue={data.type}
                        >
                            <option value="">Pilih salah satu</option>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="administrator">Administrator</option>
                        </select>
                        {errors.type && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.type}
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
