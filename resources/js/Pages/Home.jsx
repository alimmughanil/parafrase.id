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
                <div className=" flex flex-col justify-center p-4 sm:p-8 w-full">
                    <p className="text-center capitalize text-xl font-bold pt-2 pb-4">{data.type}</p>
                    <div className="flex flex-col items-start justify-between w-full gap-4 md:flex-row">
                        <div className="flex gap-2">
                            <button className="bg-gray-50 rounded-t-lg px-4">Indonesia</button>
                            <button className="bg-gray-200">English</button>
                        </div>
                        <div className={`${data.type == "translate" ? "flex gap-2" : "hidden"}`}>
                            <button className="bg-gray-200">Indonesia</button>
                            <button className="bg-gray-50 rounded-t-lg px-4">English</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-4 md:flex-row">
                        <div className="w-full form-control relative">
                            <textarea
                                className={`
                                    textarea w-full rounded-ss-none min-h-[16rem] md:min-h-[20rem] 
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
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className={`btn btn-primary btn-sm self-center absolute bottom-10 right-2 ${processing ? "loading" : null
                                    }`}
                            >
                                Proses
                            </button>

                        </div>
                        <div className="w-full form-control">
                            <textarea
                                className={`textarea w-full ${data.type == "translate" ? "rounded-se-none" : ""} min-h-[16rem] md:min-h-[20rem] ${message ? "textarea-error" : null
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
