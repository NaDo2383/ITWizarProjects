import React from 'react'

function MediaCheckbox(props) {
    const { fieldName, onChange, name, label, style, item } = props
    const handleChange = (event) => {
        onChange(fieldName, item.name, event)
    }

    return (
        <div aria-checked={item.checked} className={`${style && style}`}>
            <label
                className="flex items-center border p-2 w-full justify-center"
                style={{ color: '#363a5d' }}
            >
                <input
                    id={`radio-${name}`}
                    type="radio"
                    onChange={handleChange}
                    checked={item.checked}
                    aria-label={'radio-' + name}
                    className="h-5 w-5 mr-3 border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                />
                {label}
                <span className="btn-radio" />
            </label>
        </div>
    )
}

export default MediaCheckbox
