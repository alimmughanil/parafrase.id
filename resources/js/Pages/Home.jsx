import HomeLayout from "@/Layouts/HomeLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome(props) {
    const [result, setResult] = useState(null);
    const [textCount, setTextCount] = useState(0);
    const [message, setMessage] = useState(null);
    const [translate, setTranslate] = useState({
        from: "id",
        to: "en",
    });
    const { data, setData, post, errors, processing } = useForm({
        type: "paraphrase",
        text: "",
        language: 'id',
    });
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const validTypes = ['paraphrase', 'summerize', 'correction', 'translate']

        if (params.get("type")) {
            const validatedType = validTypes.includes(params.get("type"))
            const type = validatedType ? params.get("type") : 'paraphrase'
            setData("type", type);
        }
    }, []);

    const handleChangeTranslateFrom = (e) => {
        if (e.target.value == "id") {
            setTranslate({
                ...translate,
                from: "id",
                to: "en",
            });

        } else {
            setTranslate({
                ...translate,
                from: "en",
                to: "id",
            });
        }
        if (result && data.text) {
            setData("text", result.choices[0].text.slice(1).trim());
            setResult(null);
        }
        handleChangeLanguage(e)
    };

    const handleChangeLanguage = (e) => {
        setData('language', e.target.value)
    }

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
                    {props.flash.message
                        ? <div className="badge badge-error mx-auto mb-4 h-full text-center text-white">{props.flash.message}</div>
                        : null
                    }
                    <div className="flex flex-col items-start justify-between w-full gap-4 md:flex-row">
                        <div className="flex gap-2">
                            <button value='id' onClick={data.type == "translate" ? handleChangeTranslateFrom : handleChangeLanguage} className={`${data.language == 'id' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200 px-2'}`}>Indonesia</button>
                            <button value='en' onClick={data.type == "translate" ? handleChangeTranslateFrom : handleChangeLanguage} className={`${data.language == 'en' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200'}`}>English</button>
                        </div>
                        <div className={`${data.type == "translate" ? "md:flex gap-2 hidden" : "hidden"}`}>
                            <button value='id' className={`${translate.to == 'id' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200 px-2'}`}>Indonesia</button>
                            <button value='en' className={`${translate.to == 'en' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200'}`}>English</button>
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
                        <div className={`${data.type == "translate" ? "flex gap-2 md:hidden" : "hidden"}`}>
                            <button value='id' className={`${translate.to == 'id' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200 px-2'}`}>Indonesia</button>
                            <button value='en' className={`${translate.to == 'en' ? 'bg-gray-50 rounded-t-lg px-4' : 'bg-gray-200'}`}>English</button>
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
