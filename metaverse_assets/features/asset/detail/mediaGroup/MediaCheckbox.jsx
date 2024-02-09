import React, { useState } from 'react'

function MediaCheckbox(props) {
    const { onChange, name, checked, label, style } = props
    const [isChecked, setIsChecked] = useState(checked || false)
    const handleChange = (event) => {
        const newChecked = event.target.checked
        setIsChecked(newChecked)
        onChange(event, true)
    }

    return (
        <div aria-checked={isChecked} className={`${style && style}`}>
            <label
                className="flex items-center border p-2 w-full justify-center"
                style={{ color: '#363a5d' }}
            >
                <input
                    id={`checkbox-${name}`}
                    type="checkbox"
                    name={name}
                    onChange={handleChange}
                    checked={isChecked}
                    aria-label={'checkbox-' + name}
                    className="h-5 w-5 mr-3 rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                />
                {label}
                <span className="btn-checkbox" />
            </label>
        </div>
    )
}

export default MediaCheckbox
