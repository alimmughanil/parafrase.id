import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

function Create(props) {
    const [open, setOpen] = useState(false);

    const { data, setData, put, errors, processing } = useForm({
        type: props.prompt.type,
        instruction: props.prompt.instruction,
        lang: props.prompt.lang,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value.toString().toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/prompts/${props.prompt.id}`);
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
                    <p className="text-lg font-semibold">Update Prompt</p>

                    {props.flash.message ? (
                        <div className="text-center badge badge-primary badge-outline h-max">
                            {props.flash.message}
                        </div>
                    ) : null}

                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Tipe</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan tipe disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="type"
                            value={data.type}
                        />
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
                            <span className="label-text">Kode Bahasa</span>
                            <span className="label-text">Example: id</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan kode bahasa disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="lang"
                            value={data.lang}
                        />
                        {errors.lang && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.lang}
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Instruksi</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan instruksi disini"
                            className="w-full input input-bordered"
                            onChange={handleChange}
                            name="instruction"
                            value={data.instruction}
                        />
                        {errors.instruction && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    * {errors.instruction}
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
