import { useStatisticsCtx } from 'features/statistics/useStatisticsCtx'
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfMonth, endOfMonth } from 'date-fns'

interface CustomHeaderProps {
    date: Date
    changeYear: (year: number) => void
}

export default function DatePickerByMonths({ selectedRange }: { selectedRange: number }) {
    const { startDate, setStartDate, endDate, setEndDate } = useStatisticsCtx()
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1989 }, (_, index) => currentYear - index)

    const renderCustomHeader: React.FC<CustomHeaderProps> = ({ date, changeYear }) => (
        <div
            style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <select
                className="bg-[#fff] focus:border-0 text-[#131523] font-Inter text-[16px] font-700 leading-[24px]"
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(parseInt(value, 10))}
            >
                {years.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )

    useEffect(() => {
        if (selectedRange === 2) {
            setEndDate(endOfMonth(new Date()))
            setStartDate(startOfMonth(new Date()))
        }
    }, [selectedRange])

    return (
        <div className="flex gap-[5px] text-white items-center">
            <div>
                <DatePicker
                    renderCustomHeader={renderCustomHeader}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate}
                    placeholderText="Start Date"
                    showPopperArrow={false}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                />
            </div>
            {' ~ '}
            <div>
                <DatePicker
                    renderCustomHeader={renderCustomHeader}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    showPopperArrow={false}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                />
            </div>
        </div>
    )
}
