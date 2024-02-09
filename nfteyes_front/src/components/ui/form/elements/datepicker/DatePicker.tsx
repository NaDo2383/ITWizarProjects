import React, { useState } from 'react'
import CalendarUi from 'react-calendar'

type TCalendarValuePiece = Date | null
export type TCalendarValue = TCalendarValuePiece | [TCalendarValuePiece, TCalendarValuePiece]

type TCalendar = {
    locale?: string
    maxDate?: Date
    minDate?: Date
    onChange?: (date: Date) => void
    value?: TCalendarValue
}

function DatePicker(props: TCalendar) {
    const { maxDate, minDate, locale } = props
    const [activeDate, setActiveDate] = useState<Date | undefined>(new Date())

    function handleActiveStartDateChange() {
        setActiveDate(new Date())
    }
    return (
        <div>
            <CalendarUi
                activeStartDate={activeDate}
                className={'calendar'}
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
                onActiveStartDateChange={handleActiveStartDateChange}
            />
        </div>
    )
}

export default DatePicker
