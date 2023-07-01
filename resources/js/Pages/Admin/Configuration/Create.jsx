import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        type: "",
        value: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value.toString().toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/configuration");
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
                    <p className="text-lg font-semibold">Tambah Konfigurasi</p>

                    {props.flash.message ? (
                        <div className="text-center badge badge-primary badge-outline h-max">
                            {props.flash.message}
                        </div>
                    ) : null}

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
                            <option value="CHATGPT_SECRET_KEY">
                                CHATGPT_SECRET_KEY
                            </option>
                        </select>
                        {errors.type && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.type}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Nilai</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan value disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="value"
                            value={data.value}
                        />
                        {errors.value && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.value}
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
