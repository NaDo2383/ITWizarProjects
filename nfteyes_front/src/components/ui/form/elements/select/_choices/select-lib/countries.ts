import countries from 'world-countries'

export const formmattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    region: country.region,
    latlng: country.latlng,
}))

export function useCountries() {
    const getAll = () => formmattedCountries

    const getByValue = (value: string) => {
        return formmattedCountries.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue,
    }
}
