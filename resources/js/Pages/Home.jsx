import HomeLayout from "@/Layouts/HomeLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome(props) {
    const params = new URLSearchParams(location.search);
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState(null);

    const { data, setData, post, errors, processing } = useForm({
        type: params.get("type") ? params.get("type") : "paraphrase",
        text: "",
    });

    const handleSubmit = () => {
        setResult(null);
        setMessage(null);
        post("/prompt", {
            onSuccess: ({ props }) => {
                if (props.flash.message) return setMessage(props.flash.message);
                setResult(JSON.parse(props.result));
            },
        });
    };

    return (
        <>
            <Head title="Parafrase ID" />
            <HomeLayout title={props.title} auth={props.auth}>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="py-4">Selamat datang di Parafrase ID</p>
                    <div className="flex gap-2 overflow-auto whitespace-pre scrollbar-hide max-w-xs md:max-w-full">
                        <button
                            onClick={() => setData("type", "paraphrase")}
                            className={`badge badge-primary ${
                                data.type != "paraphrase"
                                    ? "badge-outline"
                                    : null
                            }`}
                        >
                            Parafrase
                        </button>
                        <button
                            onClick={() => setData("type", "correction")}
                            className={`badge badge-primary ${
                                data.type != "correction"
                                    ? "badge-outline"
                                    : null
                            }`}
                        >
                            Koreksi
                        </button>
                        <button
                            onClick={() => setData("type", "summerize")}
                            className={`badge badge-primary ${
                                data.type != "summerize"
                                    ? "badge-outline"
                                    : null
                            }`}
                        >
                            Rangkuman
                        </button>
                        <button
                            onClick={() => setData("type", "translateId")}
                            className={`badge badge-primary ${
                                data.type != "translateId"
                                    ? "badge-outline"
                                    : null
                            }`}
                        >
                            Terjemahkan
                        </button>
                    </div>
                    {message ? (
                        <div className="badge badge-error badge-outline mt-2">
                            {message}
                        </div>
                    ) : null}
                    <div className="flex flex-col md:flex-row gap-4 w-full items-start py-4 px-4">
                        <div className="form-control w-full">
                            <textarea
                                className={`
                                    textarea textarea-bordered w-full h-40 
                                    ${errors.text ? "textarea-error" : null}
                                `}
                                placeholder="Tuliskan teks disini"
                                value={data.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                            ></textarea>
                            {errors.text ? (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        * {errors.text}
                                    </span>
                                </label>
                            ) : null}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className={`btn btn-primary btn-sm self-center ${
                                processing ? "loading" : null
                            }`}
                        >
                            Proses
                        </button>
                        <div className="form-control w-full">
                            <textarea
                                className={`textarea textarea-bordered w-full h-40 ${
                                    message ? "textarea-error" : null
                                }`}
                                placeholder={
                                    processing
                                        ? "Sedang diproses..."
                                        : "Hasil akan muncul disini"
                                }
                                value={
                                    result
                                        ? result.choices[0].text.slice(1).trim()
                                        : ""
                                }
                                readOnly
                            ></textarea>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    );
}
