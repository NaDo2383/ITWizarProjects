import React from 'react'

function InputNumber(props) {
    const { onChange, placeholder, name, required, isValid, value, width, disabled, max } = props

    const style = {
        width: width ? `${width}px` : '100%',
    }

    function stopArrows(e) {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
    }

    return (
        <input
            type="number"
            required={required}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder || ''}
            aria-label={'number-input-' + name}
            aria-invalid={isValid}
            min="0"
            max={max && max}
            step="1"
            style={style}
            className={isValid ? 'input-invalid ' : ''}
            disabled={disabled}
            onWheel={(e) => e.target.blur()}
            onKeyDown={(e) => stopArrows(e)}
        />
    )
}

export default InputNumber
