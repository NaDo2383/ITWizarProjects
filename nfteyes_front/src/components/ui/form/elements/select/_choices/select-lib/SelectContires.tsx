import React from 'react'
import { useCountries } from './countries'
import Select from 'react-select'
export type TCountrySelectValue = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
}

interface ISelectCountry {
    value?: TCountrySelectValue
    onChange: (value: TCountrySelectValue) => void
}

function SelectContires({ value, onChange }: ISelectCountry) {
    const { getAll } = useCountries()
    return (
        <div>
            <Select
                placeholder="anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as TCountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-10">
                        <div>{option.flag}</div>
                        <div>
                            {option.label},<span className=" text-neutral-800 ml-4">{option.region}</span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    },
                })}
            />
        </div>
    )
}

export default SelectContires
