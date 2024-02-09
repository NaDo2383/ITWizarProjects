import { dayNames } from 'components/ui/form/elements/datepicker/dateData'

export function getNumberOfDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}
export function getSortedDays(year: number, month: number) {
    const dayIndex = new Date(year, month, 1).getDay()
    const firstHalf = dayNames.slice(dayIndex)
    return [...firstHalf, ...dayNames.slice(0, dayIndex)]
}
export function range(start: number, end: number) {
    const length = Math.abs((end - start) / 1)
    const { result }: any = Array.from({ length }).reduce(
        ({ result, current }: any) => ({
            result: [...result, current],
            current: current + 1,
        }),
        { result: [], current: start }
    )
    return result
}
