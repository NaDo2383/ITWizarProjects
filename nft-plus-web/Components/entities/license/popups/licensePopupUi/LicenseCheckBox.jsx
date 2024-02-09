import CheckboxNative from 'Components/ui/checkbox/CheckNative'
import H2 from 'Components/ui/typography/H2'
import React from 'react'

function LicenseCheckBox({ checked, label, handleChange }) {
  return (
    <div className='flex gap-[5px] items-center'>
        <CheckboxNative checked={checked} onChange={handleChange} />
        <H2>{ label }</H2>
    </div>
  )
}

export default LicenseCheckBox