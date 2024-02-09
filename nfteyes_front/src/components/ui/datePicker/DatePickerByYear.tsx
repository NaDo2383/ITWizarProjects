import { useStatisticsCtx } from 'features/statistics/useStatisticsCtx'
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { endOfYear, startOfYear } from 'date-fns'

interface CustomHeaderProps {
    decreaseYear: () => void
    increaseYear: () => void
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ decreaseYear, increaseYear }) => {
    return (
        <div className="custom-header">
            <div className="custom-header-month-year">
                <div onClick={decreaseYear} className="custom-header-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="4" fill="white" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.7071 12.2929C20.3466 11.9324 19.7794 11.9047 19.3871 12.2097L19.2929 12.2929L14.2929 17.2929C13.9324 17.6534 13.9047 18.2206 14.2097 18.6129L14.2929 18.7071L19.2929 23.7071C19.6834 24.0976 20.3166 24.0976 20.7071 23.7071C21.0676 23.3466 21.0953 22.7794 20.7903 22.3871L20.7071 22.2929L16.415 18L20.7071 13.7071C21.0676 13.3466 21.0953 12.7794 20.7903 12.3871L20.7071 12.2929Z"
                            fill="#9A88B1"
                        />
                    </svg>
                </div>
                <div className="custom-header-month-year-text text-[#131523] !text-[16px] !font-700 !leading-[24px]">
                    Years
                </div>
                <div onClick={increaseYear} className="custom-header-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="4" fill="white" />
                        <path
                            d="M15.2929 12.2929C15.6534 11.9324 16.2206 11.9047 16.6129 12.2097L16.7071 12.2929L21.7071 17.2929C22.0676 17.6534 22.0953 18.2206 21.7903 18.6129L21.7071 18.7071L16.7071 23.7071C16.3166 24.0976 15.6834 24.0976 15.2929 23.7071C14.9324 23.3466 14.9047 22.7794 15.2097 22.3871L15.2929 22.2929L19.585 18L15.2929 13.7071C14.9324 13.3466 14.9047 12.7794 15.2097 12.3871L15.2929 12.2929Z"
                            fill="#9A88B1"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function DatePickerByYear({ selectedRange }: { selectedRange: number }) {
    const { startDate, setStartDate, endDate, setEndDate } = useStatisticsCtx()

    useEffect(() => {
        if (selectedRange === 3) {
            setEndDate(endOfYear(new Date()))
            setStartDate(startOfYear(new Date()))
        }
    }, [selectedRange])
    return (
        <div className="flex gap-[5px] text-white items-center">
            <div>
                <DatePicker
                    renderCustomHeader={CustomHeader}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate}
                    placeholderText="Start Date"
                    showPopperArrow={false}
                    showYearPicker
                    dateFormat="yyyy"
                />
            </div>
            {' ~ '}
            <div>
                <DatePicker
                    renderCustomHeader={CustomHeader}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    showPopperArrow={false}
                    showYearPicker
                    dateFormat="yyyy"
                />
            </div>
        </div>
    )
}
