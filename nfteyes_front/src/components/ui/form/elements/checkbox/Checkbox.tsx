import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import tw from 'tailwind-styled-components'

export type TCheckbox = TFormElement & {
    checked?: boolean
    label?: string
}
function Checkbox(props: TCheckbox) {
    const { onChange, name, checked, label } = props
    const [isChecked, setIsChecked] = useState<boolean>(checked || false)

    useEffect(() => {
        setIsChecked(Boolean(checked))
    }, [checked])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked
        setIsChecked(newChecked)
        onChange!(event, true)
    }

    return (
        <div className="flex gap-2 justify-center" aria-checked={isChecked}>
            <div className={`checkbox ${isChecked ? 'checkbox--checked' : ''}`}>
                <input
                    id={`checkbox-${name}`}
                    type="checkbox"
                    name={name}
                    onChange={handleChange}
                    checked={isChecked}
                    aria-label={'checkbox-' + name}
                    style={{ height: 'inherit', width: 'inherit' }}
                    className="border-none z-50 bg-transparent appearance-none !w-[23px] !px-[11.5px]"
                />
                {isChecked && <BsCheck className="absolute top-[50%] -translate-y-[50%] text-gray-50" />}
            </div>
            {label && <label htmlFor={`checkbox-${name}`}>{label}</label>}
        </div>
    )
}

export const CheckBoxTw = tw.input`

`

export default Checkbox
