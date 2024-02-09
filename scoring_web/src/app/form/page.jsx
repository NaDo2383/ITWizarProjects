"use client"
import InputField from "../components/fields/InputField"
import useForm from "../common/form/useForm"
import { useState } from "react"
import useApiConnections from "../features/connections/useApiConnections"
import Card from "../components/card"
import { useGlobalCtx } from "../common/global/useGlobalCtx"



const init = {
    registerNo: {
        value: null,
        error: null
    },
    productName: {
        value: null,
        error: null
    },
    productPrice: {
        value: null,
        error: null
    },
    productType: {
        value: null,
        error: null
    },
    interest: {
        value: null,
        error: null
    },
    prePayment: {
        value: null,
        error: null
    },
    period: {
        value: null,
        error: null
    },
    residentialAddr: {
        value: null,
        error: null
    },
    phone: {
        value: null,
        error: null
    }
}
export default function page() {
    const { onChange, formState } = useForm(init);
    const [selectState, setSelectState] = useState({
        education: "Дээд",
        homeType: "Орон сууц",
        ownershipType: "Өөрийн",
        saving: "Тийм",
        repeatBorrower: "Тийм",
        blacklist: "Тийм",
    })
    const { sendFormData } = useApiConnections()
    const [calculatedScore, setCalculatedScore] = useState("")
    const [status, setStatus] = useState(null)
    const { loading } = useGlobalCtx()

    async function handleClick(e) {
        e.preventDefault();

        const payload = {
            registerNo: formState.registerNo.value,
            productName: formState.productName.value,
            productPrice: +formState.productPrice.value,
            productType: formState.productType.value,
            loanAmount: +formState.productPrice.value - +formState.prePayment.value,
            interest: +formState.interest.value,
            prePayment: +formState.prePayment.value,
            period: +formState.period.value,
            education: selectState.education,
            homeType: selectState.homeType,
            ownershipType: selectState.ownershipType,
            saving: selectState.saving,
            residentialAddr: formState.residentialAddr.value,
            phone: +formState.phone.value,
            repeatBorrower: selectState.repeatBorrower,
            blacklist: selectState.blacklist
        }

        await sendFormData(payload)
            .then((res) => {
                if (res.data.message === "Амжилттай") {
                    alert(`Амжилттай тооцоолол хийгдлээ харилцагчийн оноо ${res.data.result.score}`)
                    setCalculatedScore(res.data.result.score)
                    setStatus(res.data.result.status)
                } else {
                    alert("Тооцоолол хийхэд алдаа гарлаа")
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Тооцоолол хийхэд алдаа гарлаа")
            })
    }

    return (
        <div className="h-full flex gap-10">
            <Card extra={'pb-10 p-4 mt-3 w-auto min-w-[636px]'}>
                <form>
                    <div className='flex h-full w-full items-center justify-center md:mx-0 md:px-0 lg:items-center lg:justify-start'>
                        {/* Sign in section */}
                        <div className='w-full flex-col items-center md:pl-4 lg:pl-0 max-w-[600px]'>
                            {/* <div className="flex flex-col xl:flex-row gap-5 w-full"> */}
                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Барааны нэр*'
                                placeholder='LG зурагт 50" ...'
                                id='productName'
                                type='text'
                                name="productName"
                                onChange={onChange}
                            />

                            {/* <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Барааны төрөл*'
                                placeholder='Зурагт'
                                id='productType'
                                type='text'
                                name="productType"
                                onChange={onChange}
                            /> */}
                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Барааны үнэ*'
                                placeholder='100000'
                                id='productPrice'
                                type='number'
                                name="productPrice"
                                onChange={onChange}
                            />

                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Урьдчилгаа төлбөр*'
                                placeholder='20000'
                                id='prePayment'
                                type='number'
                                name="prePayment"
                                onChange={onChange}
                            />
                            {/* <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Утасны дугаар*'
                                placeholder='99112233'
                                id='phone'
                                type='number'
                                name="phone"
                                onChange={onChange}
                            /> */}
                            {/* </div>
                        <div className="flex flex-col xl:flex-row gap-5 w-full"> */}
                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='РД дугаар*'
                                placeholder='АА12345678'
                                id='registerNo'
                                type='text'
                                name="registerNo"
                                onChange={onChange}
                            />

                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Зээлийн хүү*'
                                placeholder='8'
                                id='interest'
                                type='number'
                                name="interest"
                                onChange={onChange}
                            />
                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Хугацаа*'
                                placeholder='36'
                                id='period'
                                type='number'
                                name="period"
                                onChange={onChange}
                            />
                            <InputField
                                variant='auth'
                                extra='mb-3 w-full flex items-center'
                                label='Оршин суугаа хаяг*'
                                placeholder='УБ ХУД 10 хороо'
                                id='residentialAddr'
                                type='text'
                                name="residentialAddr"
                                onChange={onChange}
                            />
                            {/* </div>
                        <div className="flex flex-col xl:flex-row gap-5 w-full"> */}
                            <div className="mb-3 w-full flex items-center">
                                <label
                                    htmlFor="education"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Боловсрол
                                </label>
                                <select id="education" value={selectState.education} onChange={(e) => setSelectState(prev => ({ ...prev, education: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Дээд">Дээд</option>
                                    <option value="Дунд">Дунд</option>
                                    <option value="Бүрэн дунд">Бүрэн дунд</option>
                                    <option value="Боловсролгүй">Боловсролгүй</option>
                                </select>
                            </div>
                            <div className="mb-3 w-full flex items-center">

                                <label
                                    htmlFor="homeType"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Орон байрны төрөл
                                </label>
                                <select id="homeType" value={selectState.homeType} onChange={(e) => setSelectState(prev => ({ ...prev, homeType: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Орон сууц">Орон сууц</option>
                                    <option value="Гэр хороолол">Гэр хороолол</option>
                                </select>
                            </div>
                            <div className="mb-3 w-full flex items-center">

                                <label
                                    htmlFor="ownershipType"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Өмчлөлийн хэлбэр
                                </label>
                                <select id="ownershipType" value={selectState.ownershipType} onChange={(e) => setSelectState(prev => ({ ...prev, ownershipType: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Өөрийн">Өөрийн</option>
                                    <option value="Түрээсийн">Түрээсийн</option>
                                    <option value="Гэр бүлийн">Гэр бүлийн</option>
                                    <option value="Бусад">Бусад</option>
                                </select>
                            </div>
                            <div className="mb-3 w-full flex items-center">

                                <label
                                    htmlFor="saving"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Хадгаламжтай эсэх
                                </label>
                                <select id="saving" value={selectState.saving} onChange={(e) => setSelectState(prev => ({ ...prev, saving: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Тийм">Тийм</option>
                                    <option value="Үгүй">Үгүй</option>
                                </select>
                            </div>
                            <div className="mb-3 w-full flex items-center">

                                <label
                                    htmlFor="repeatBorrower"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Давтан зээлдэгч эсэх
                                </label>
                                <select id="repeatBorrower" value={selectState.repeatBorrower} onChange={(e) => setSelectState(prev => ({ ...prev, repeatBorrower: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Тийм">Тийм</option>
                                    <option value="Үгүй">Үгүй</option>
                                </select>
                            </div>
                            <div className="mb-3 w-full flex items-center">

                                <label
                                    htmlFor="blacklist"
                                    className={`text-sm text-navy-700 dark:text-white ml-3 font-bold min-w-[200px]`}
                                >
                                    Муу зээлийн түүхтэй эсэх
                                </label>
                                <select id="blacklist" value={selectState.blacklist} onChange={(e) => setSelectState(prev => ({ ...prev, blacklist: e.target.value }))} className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                    <option value="Тийм">Тийм</option>
                                    <option value="Үгүй">Үгүй</option>
                                </select>
                            </div>
                            {/* </div> */}
                            <button onClick={handleClick} disabled={loading} className='linear w-full mt-4
                        rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                                {loading ? "Тооцоолол илгээж байна" : "Илгээх"}
                            </button>
                        </div>
                    </div>
                </form>
            </Card>
            <Card extra={'p-4 mt-3 w-auto h-fit min-w-[400px]'} >
                <div className="flex w-full">
                    <div className="min-w-[200px]">Тооцоологдсон эсэх: </div>
                    <div className={`${calculatedScore ? "text-green-500" : " text-red-500"}`}>{calculatedScore ? "Тооцоологдсон" : "Тооцоологдooгүй"}</div>
                </div>
                <div className="flex w-full">
                    <div className="min-w-[200px]">Тооцоологдсон оноо: </div>
                    <div>{calculatedScore}</div>
                </div>
                <div
                    className={`text-[12px] border-white/0 py-2  pr-4 text-center ${status === "POSSIBLE" ? "text-green-600" : status === "QUESTIONABLE" ? "text-orange-600" : "text-red-600"}  font-bold`}
                >
                    {status === "POSSIBLE" ? "БОЛОМЖТОЙ" : status === "QUESTIONABLE" ? "ЭРГЭЛЗЭЭТЭЙ" : "БОЛОМЖГҮЙ"}
                </div>
            </Card >
        </div >
    )
}
