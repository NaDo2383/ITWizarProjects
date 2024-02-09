// import { TFormElement } from 'a/common/types/common'

import React, { useState } from 'react'

function Checkbox(props) {
    const { onChange, name, checked, label, disabled } = props
    const [isChecked, setIsChecked] = useState(checked || false)
    const handleChange = (event) => {
        const newChecked = event.target.checked
        setIsChecked(newChecked)
        onChange(event, true)
    }
    if (disabled) {
        return (
            <div className="widget-category-checkbox" aria-checked={isChecked}>
                <label>{label}
                    <input
                        id={`checkbox-${name}`}
                        type="checkbox"
                        name={name}
                        onChange={handleChange}
                        checked={checked}
                        aria-label={'checkbox-' + name}
                        disabled
                    />
                    <span className="btn-checkbox" />
                </label>
            </div>
        )
    } else {
        return (
            <div className="widget-category-checkbox" aria-checked={isChecked}>
                <label>{label}
                    <input
                        id={`checkbox-${name}`}
                        type="checkbox"
                        name={name}
                        onChange={handleChange}
                        checked={isChecked}
                        aria-label={'checkbox-' + name}
                    />
                    <span className="btn-checkbox" />
                </label>
            </div>
        )
    }
}

export default Checkbox
