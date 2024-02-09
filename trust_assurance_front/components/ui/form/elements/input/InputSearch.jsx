import React from 'react'
import { BsSearch } from 'react-icons/bs'

function InputSearch(props) {
    const { onChange, placeholder, name, isValid, value } = props
    return (
        <div className="flex items-center gap-5 border border-blackSoft border-opacity-10 rounded-md pl-10 py-4">
            <BsSearch />
            <input
                type="text"
                onChange={onChange}
                name={name}
                value={value || ''}
                placeholder={placeholder || ''}
                aria-label={'search-input-' + name}
                aria-invalid={isValid}
                className={'w-full border-none focus:outline-none focus:ring-0 bg-transparent placeholder-blackSoft'}
            />
        </div>
    )
}

export default InputSearch
