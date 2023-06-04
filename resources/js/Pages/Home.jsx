import HomeLayout from "@/Layouts/HomeLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome(props) {
    const [result, setResult] = useState(null);
    const [textCount, setTextCount] = useState(0);
    const [message, setMessage] = useState(null);
    const [translate, setTranslate] = useState({
        from: "Bahasa Indonesia",
        to: "Bahasa Inggris",
    });

    const { data, setData, post, errors, processing } = useForm({
        type: "paraphrase",
        text: "",
    });
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("type")) {
            setData("type", params.get("type"));
        }
    }, []);

    const handleTranslateChange = () => {
        if (translate.from == "Bahasa Indonesia") {
            setTranslate({
                ...translate,
                from: "Bahasa Inggris",
                to: "Bahasa Indonesia",
            });
        } else {
            setTranslate({
                ...translate,
                from: "Bahasa Indonesia",
                to: "Bahasa Inggris",
            });
        }
        if (result && data.text) {
            setData("text", result.choices[0].text.slice(1).trim());
            setResult(null);
        }
    };

    const handleDataChange = (e) => {
        const filteredText = e.target.value.substring(0, 2048);
        setData("text", filteredText);
        setTextCount(filteredText.length);
    };

    const handleSubmit = () => {
        setResult(null);
        setMessage(null);
        data.type == "translate" ? (data.translate = translate) : null;

        post("/prompt", {
            onSuccess: ({ props }) => {
                if (props.flash.message) return setMessage(props.flash.message);
                setResult(JSON.parse(props.data.result));
            },
        });
    };

    return (
        <>
            <Head title="Beranda" />
            <HomeLayout title={props.title} auth={props.auth}>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="py-4">Selamat datang di Parafrase ID</p>
                    <div className="flex max-w-xs gap-2 overflow-auto whitespace-pre scrollbar-hide md:max-w-full">
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
                            onClick={() => setData("type", "translate")}
                            className={`badge badge-primary ${
                                data.type != "translate"
                                    ? "badge-outline"
                                    : null
                            }`}
                        >
                            Terjemahkan
                        </button>
                    </div>
                    {message ? (
                        <div className="mt-2 badge badge-error badge-outline">
                            {message}
                        </div>
                    ) : null}
                    {data.type == "translate" ? (
                        <div className="flex items-center gap-4 px-4 pt-2 justify-evenly">
                            <h3>{translate.from}</h3>
                            <button
                                onClick={handleTranslateChange}
                                className="btn btn-ghost btn-sm"
                            >
                                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                            </button>
                            <h3>{translate.to}</h3>
                        </div>
                    ) : null}

                    <div className="flex flex-col items-start w-full gap-4 px-4 py-2 md:flex-row">
                        <div className="w-full form-control">
                            <textarea
                                className={`
                                    textarea textarea-bordered w-full h-40 md:min-h-[20rem] 
                                    ${errors.text ? "textarea-error" : null}
                                `}
                                placeholder="Tuliskan teks disini"
                                value={data.text}
                                onChange={handleDataChange}
                            ></textarea>
                            <label className="label">
                                {errors.text ? (
                                    <span className="label-text-alt text-error">
                                        * {errors.text}
                                    </span>
                                ) : null}
                                <span className="label-text-alt">
                                    {textCount}/2048
                                </span>
                            </label>
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
                        <div className="w-full form-control">
                            <textarea
                                className={`textarea textarea-bordered w-full h-40 md:min-h-[20rem] ${
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
