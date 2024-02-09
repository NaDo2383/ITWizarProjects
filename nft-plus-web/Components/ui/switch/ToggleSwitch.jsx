import React from 'react'

function ToggleSwitch({ isToggled, onToggle, name }) {

  function handleChangeToggle(event) {

    onToggle(event.target.checked, name)
  }
  const toggledValue = isToggled || false
  
  return (
    <label className="toggle-switch">
        <input
            name={name} 
            type="checkbox" 
            checked={toggledValue} 
            onChange={handleChangeToggle} 
            className='absolute top-0 left-0 z-[9999]'
        />
        <span className="switch" />
    </label>
  )
}

export default ToggleSwitch