/* eslint-disable no-unused-vars */
import { DetailSectionHeader, DetailSubHeader } from 'a/components/ui/typography/header'
import React, { useState, useEffect, useCallback } from 'react'
// import MediaCheckbox from './mediaGroup/MediaCheckbox'
// import MediaCheckboxGroup from './mediaGroup/MediaCheckboxGroup'
import LimitationRadioGroup from './limitationGroup/LimitationRadioGroup'
import LimitationRadioButton from './limitationGroup/LimitationRadioButton'
import tw from 'tailwind-styled-components'
import { POPUP_TYPES } from 'a/common/popup/popupRegistration'
import { usePopupCtx } from 'a/common/popup/usePopupCtx'
import { BtnTw } from 'a/components/ui/button/Button'
import { OutlineMediumBtn } from 'a/components/ui/button/OutlineBtn'
import AssetChart from './AssetChart'
import 'chart.js/auto'
import useCheckbox from 'a/components/ui/form/elements/checkbox/useCheckbox'
import useForm from 'a/components/ui/form/store/useForm'
import InputPrice from 'a/components/ui/form/elements/input/InputPrice'
import FormRow from 'a/components/ui/form/FormRow'
import { useAssetCtx } from '../useAssetCtx'

export const useMedia = [
    {
        name: 'YouTube',
        label: 'YouTube',
        checked: true,
    },
    {
        name: '블로그',
        label: '블로그',
        checked: false,
    },
    {
        name: 'SNS',
        label: 'SNS',
        checked: false,
    },
    {
        name: '웹사이트',
        label: '웹사이트',
        checked: false,
    },
]

export const useLimitation = [
    {
        name: 'Limited',
        label: '한정',
        checked: true,
    },
    {
        name: 'Unlimited',
        label: '무한정',
        checked: false,
    },
]

const initialPriceChangeState = {
    price: { value: null, error: null },
}

export default function SignLicenseAgreement(props) {
    const [selectedAxis, setSelectedAxis] = useState(null)
    const [formattedNumber, setFormattedNumber] = useState('0')
    const [playCount, setPlayCount] = useState('0')
    const [layoutData, setLayoutData] = useState([])
    const [chartData, setChartData] = useState(null)
    const { showPopup } = usePopupCtx()
    const { assetDetail } = useAssetCtx()
    const [initialFilterFormState] = useState({
        useMedia,
        useLimitation,
    })
    const { getCheckedList } = useCheckbox()
    const { formState } = useForm(initialFilterFormState, initialPriceChangeState)

    useEffect(() => {
        if (assetDetail?.token) {
            const load = async () => {
                const res = await fetch(`/lriif/lriif_${assetDetail.token}`)
                const data = await res.json()
                setLayoutData(data.sample_list)
            }
            load()
        }
    }, [assetDetail?.token])

    // useEffect(() => {
    //     let foundSales = false
    //     let foundPlayCount = false
    //     let foundMediaType = false
    //     let foundLimitation = false
    //     layoutData.forEach((item) => {
    //         switch (item[0].toLowerCase()) {
    //             case 'sales':
    //                 foundSales = true
    //                 break
    //             case 'playcount':
    //                 foundPlayCount = true
    //                 break
    //             case 'mediaType':
    //                 foundMediaType = true
    //                 break
    //             case 'limitation':
    //                 foundLimitation = true
    //                 break
    //         }
    //     })
    //     if (foundSales && foundPlayCount && foundLimitation) {
    //         onClickSetAxis('sales')
    //     } else {
    //         onClickSetAxis('playcount')
    //     }
    // }, [layoutData])

    // const handleChange = (e) => setPrice(e.target.value)

    function onClickSetAxis(type) {
        setSelectedAxis(type)
    }

    const onClickCalculatePayment = useCallback(() => {
        if (selectedAxis) {
            const load = async () => {
                const payload = {
                    id: +assetDetail.token,
                    // id: +props.id,
                    axis: selectedAxis,
                    sales: Number(formattedNumber.replace(/[^0-9.-]+/g, '')) * 10000,
                    playcount: Number(playCount.replace(/[^0-9.-]+/g, '')),
                }
                if (payload.sales === 0 && payload.playcount === 0) {
                    return
                }
                if (selectedAxis === 'sales' && payload.sales === 0) {
                    return
                }
                if (selectedAxis === 'playcount' && payload.playcount === 0) {
                    return
                }
                const res = await fetch(`/lriif_calc`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                const data = await res.json()
                setChartData(data)
            }
            load()
        } else {
            alert('X축을 선택하세요.')
        }
    }, [props.id, selectedAxis, formattedNumber, playCount])

    const handleInputChange = (value) => {
        const inputValue = value.replace(/,/g, '')
        const parsedNumber = parseInt(inputValue)

        if (!isNaN(parsedNumber) && parsedNumber >= 0) {
            const formattedWithCommas = parsedNumber.toLocaleString()
            setFormattedNumber(formattedWithCommas)
        } else {
            setFormattedNumber('0')
        }
    }

    const handleInputCountChange = (value) => {
        const inputValue = value.replace(/,/g, '')
        const parsedNumber = parseInt(inputValue)

        if (!isNaN(parsedNumber) && parsedNumber >= 0) {
            const formattedWithCommas = parsedNumber.toLocaleString()
            setPlayCount(formattedWithCommas)
        } else {
            setPlayCount('0')
        }
    }

    const incrementCountValue = (increment) => {
        const numberString = playCount.replaceAll(',', '')
        const currentValue = parseInt(numberString)
        const newValue = currentValue + increment
        if (!isNaN(newValue) && newValue >= 0) {
            const formattedNewValue = newValue.toLocaleString()
            setPlayCount(formattedNewValue)
        }
    }

    const incrementValue = (increment) => {
        const numberString = formattedNumber.replaceAll(',', '')
        const currentValue = parseInt(numberString)
        const newValue = currentValue + increment
        if (!isNaN(newValue) && newValue >= 0) {
            const formattedNewValue = newValue.toLocaleString()
            setFormattedNumber(formattedNewValue)
        }
    }

    useEffect(() => {
        if (formState?.useMedias) {
            const list = getCheckedList(formState?.useMedias)
        }
        if (formState?.labelItems) {
            const list = getCheckedList(formState?.labelItems)
        }
    }, [formState])

    const licensePopup = () => {
        showPopup(POPUP_TYPES.LICENSE_AGREEMENT)
    }

    const yAxisStepper =
        chartData?.Plot?.length > 0
            ? Math.max(0, ...chartData?.Plot?.map((item) => +item.y)) / 5
            : 1

    // process.env.NODE_ENV === "development" && console.log("assetDetail", assetDetail)

    return (
        <div className=" bg-jacarta-100 dark:bg-jacarta-700 bg-opacity-70 rounded-lg p-5 mb-8">
            <DetailSectionHeader>라이선스 계약하기</DetailSectionHeader>
            <div className="flex md:flex-row lg:flex-row flex-col w-full gap-8 bg-white dark:bg-jacarta-600 rounded-md sm:p-10 p-4">
                <div className="flex flex-col md:w-1/2 lg:w-1/2 w-full gap-4">
                    <div className=" flex flex-col w-full gap-2">
                        <div className="flex justify-between w-full">
                            <div>
                                <DetailSubHeader>계약조건 설정</DetailSubHeader>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-4 h-4 bg-green rounded-full flex items-center mt-1"></div>{' '}
                                <div className="">X축 고정</div>
                            </div>
                        </div>
                        {layoutData.map((ldata) => {
                            switch (ldata[0]) {
                                case 'Sales':
                                    return (
                                        <SetContactContainer key={ldata[0]}>
                                            <div className="flex w-full">
                                                <label
                                                    className="flex items-center p-2 justify-center"
                                                    style={{ color: '#363a5d' }}
                                                >
                                                    <input
                                                        type="radio"
                                                        onClick={() =>
                                                            onClickSetAxis('sales')
                                                        }
                                                        checked={selectedAxis === 'sales'}
                                                        readOnly
                                                        className="h-5 w-5 mr-3 border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                                                    />
                                                    <span className="btn-radio" />
                                                </label>
                                                <div className="flex w-full border border-jacarta-400">
                                                    <CheckBtn
                                                        className={
                                                            selectedAxis === 'sales'
                                                                ? 'bg-green'
                                                                : '#C4C5CF'
                                                        }
                                                        style={{
                                                            color: '#363a5d',
                                                        }}
                                                        onClick={() =>
                                                            onClickSetAxis('sales')
                                                        }
                                                    >
                                                        매출
                                                    </CheckBtn>
                                                    <FormRow className="flex flex-row justify-center items-center bg-white">
                                                        <InputPrice
                                                            value={formattedNumber}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target.value
                                                                )
                                                            }
                                                            // placeholder={'200'}
                                                        />
                                                        <span className="px-4 whitespace-nowrap">
                                                            만원
                                                        </span>
                                                    </FormRow>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 text-jacarta-400 dark:bg-jacarta-600 bg-white dark:text-white">
                                                <SalesNumberBtn
                                                    onClick={() =>
                                                        incrementValue(
                                                            ldata[2][0]?.KeyInt
                                                        )
                                                    }
                                                    className="border border-jacarta-400"
                                                >
                                                    +{ldata[2][0]?.KeyInt}만원
                                                </SalesNumberBtn>
                                                <SalesNumberBtn
                                                    onClick={() =>
                                                        incrementValue(
                                                            ldata[2][1]?.KeyInt
                                                        )
                                                    }
                                                    className="border border-jacarta-400"
                                                >
                                                    +{ldata[2][1]?.KeyInt}만원
                                                </SalesNumberBtn>
                                                <SalesNumberBtn
                                                    onClick={() =>
                                                        incrementValue(
                                                            ldata[2][2]?.KeyInt
                                                        )
                                                    }
                                                    className="border border-jacarta-400"
                                                >
                                                    +{ldata[2][2]?.KeyInt}만원
                                                </SalesNumberBtn>
                                                <SalesNumberBtn
                                                    onClick={() =>
                                                        incrementValue(
                                                            ldata[2][3]?.KeyInt
                                                        )
                                                    }
                                                    className="border border-jacarta-400"
                                                >
                                                    +{ldata[2][3]?.KeyInt}만원
                                                </SalesNumberBtn>
                                            </div>
                                        </SetContactContainer>
                                    )
                                case 'playCount':
                                    // code block
                                    return (
                                        <SetContactContainer key={ldata[0]}>
                                            <div className="flex w-full">
                                                <label
                                                    className="flex items-center p-2 justify-center"
                                                    style={{ color: '#363a5d' }}
                                                >
                                                    <input
                                                        type="radio"
                                                        onClick={() =>
                                                            onClickSetAxis('playcount')
                                                        }
                                                        checked={
                                                            selectedAxis === 'playcount'
                                                        }
                                                        readOnly
                                                        className="h-5 w-5 mr-3 border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                                                    />
                                                    <span className="btn-radio" />
                                                </label>
                                                <div className="flex w-full border border-jacarta-400">
                                                    <CheckBtn
                                                        className={
                                                            selectedAxis === 'playcount'
                                                                ? 'bg-green'
                                                                : '#C4C5CF'
                                                        }
                                                        style={{
                                                            color: '#363a5d',
                                                        }}
                                                        onClick={() =>
                                                            onClickSetAxis('playcount')
                                                        }
                                                    >
                                                        {' '}
                                                        재생 회수
                                                    </CheckBtn>
                                                    <FormRow className="flex flex-row bg-white justify-center items-center">
                                                        <InputPrice
                                                            value={playCount}
                                                            onChange={(e) =>
                                                                handleInputCountChange(
                                                                    e.target.value
                                                                )
                                                            }
                                                            name="price"
                                                            step="100"
                                                            // placeholder={'10,000'}
                                                        />
                                                        <span className="px-2">회</span>
                                                    </FormRow>
                                                </div>
                                            </div>
                                            <div className="flex sm:flex-row flex-col gap-2 w-full text-jacarta-400 dark:text-white">
                                                <OutlineMediumBtn
                                                    onClick={() =>
                                                        incrementCountValue(
                                                            ldata[2][0]?.KeyInt
                                                        )
                                                    }
                                                >
                                                    +{ldata[2][0]?.KeyInt}회
                                                </OutlineMediumBtn>
                                                <OutlineMediumBtn
                                                    onClick={() =>
                                                        incrementCountValue(
                                                            ldata[2][1]?.KeyInt
                                                        )
                                                    }
                                                >
                                                    +{ldata[2][1]?.KeyInt}회
                                                </OutlineMediumBtn>
                                                <OutlineMediumBtn
                                                    onClick={() =>
                                                        incrementCountValue(
                                                            ldata[2][2]?.KeyInt
                                                        )
                                                    }
                                                >
                                                    +{ldata[2][2]?.KeyInt}회
                                                </OutlineMediumBtn>
                                            </div>
                                        </SetContactContainer>
                                    )
                                case 'mediaType':
                                    return (
                                        <SetContactContainer key={ldata[0]}>
                                            <div className="flex w-full">
                                                <CheckBtn
                                                    style={{
                                                        background: '#C4C5CF',
                                                        cursor: 'default',
                                                        color: '#363a5d',
                                                    }}
                                                    className="border-r-0"
                                                >
                                                    사용 매체
                                                </CheckBtn>
                                                <div className="flex justify-end w-full p-3 bg-jacarta-100"></div>
                                            </div>
                                            <div className="w-full text-jacarta-400 dark:text-white">
                                                <LimitationRadioGroup groupName="useMedia">
                                                    {formState?.useMedia?.map(
                                                        (item, idx) => (
                                                            <LimitationRadioButton
                                                                key={
                                                                    'use-media-' +
                                                                    item.name +
                                                                    '-' +
                                                                    idx
                                                                }
                                                                fieldName="useMedia"
                                                                name="useMedia"
                                                                label={item.label}
                                                                checked={item.checked}
                                                                item={item}
                                                            />
                                                        )
                                                    )}
                                                </LimitationRadioGroup>
                                            </div>
                                        </SetContactContainer>
                                    )
                                case 'limitation':
                                    return (
                                        <SetContactContainer key={ldata[0]}>
                                            <div className="flex w-full">
                                                <CheckBtn
                                                    style={{
                                                        background: '#C4C5CF',
                                                        cursor: 'default',
                                                        color: '#363a5d',
                                                    }}
                                                    className="border-r-0"
                                                >
                                                    한정
                                                </CheckBtn>
                                                <div className="flex justify-end w-full p-3 bg-jacarta-100"></div>
                                            </div>
                                            <div className="w-full text-jacarta-400 dark:text-white">
                                                <LimitationRadioGroup groupName="useLimitation">
                                                    {formState?.useLimitation?.map(
                                                        (item, idx) => (
                                                            <LimitationRadioButton
                                                                key={
                                                                    'use-limitaion-' +
                                                                    item.name +
                                                                    '-' +
                                                                    idx
                                                                }
                                                                fieldName="useLimitation"
                                                                name="useLimitation"
                                                                label={item.label}
                                                                checked={item.checked}
                                                                item={item}
                                                            />
                                                        )
                                                    )}
                                                </LimitationRadioGroup>
                                            </div>
                                        </SetContactContainer>
                                    )
                            }
                            return null
                        })}
                    </div>
                    <BtnTw
                        className="rounded-sm p-3 cursor-pointer bg-green"
                        onClick={onClickCalculatePayment}
                    >
                        계약금 계산하기
                    </BtnTw>
                    <BtnTw
                        className="rounded-sm p-3 cursor-pointer"
                        onClick={licensePopup}
                    >
                        라이선스 계약하기
                    </BtnTw>
                </div>
                <div className="md:w-1/2 lg:w-1/2 w-full">
                    <DetailSubHeader>계약 시각화</DetailSubHeader>
                    <AssetChart
                        data={chartData}
                        xAxisLabel={selectedAxis === 'sales' ? '매출(1만원)' : '재생(회)'}
                        yAxisLabel="가격(원)"
                        // yAxisStep={selectedAxis === 'sales' ? 50000 : yAxisStepper}
                        yAxisStep={yAxisStepper}
                    />
                </div>
            </div>
        </div>
    )
}

const SetContactContainer = tw.div`
    flex 
    flex-col 
    gap-2 
    w-full 
    bg-jacarta-100
    sm:bg-jacarta-600 
    p-4 
    border 
    border-jacarta-400
`

const SalesNumberBtn = tw.button`
    py-2 
    px-5 
    text-center 
    whitespace-nowrap
    border-jacarta-400
    cursor-pointer
`
const CheckBtn = tw.button`
    flex 
    justify-center 
    border-r 
    border-jacarta-400 
    w-full 
    p-3  
    font-bold
    cursor-pointer
`
