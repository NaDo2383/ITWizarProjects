import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn'
import React from 'react'

function LicenseRightButtons({ rights }) { 
  return (
    <div className=''>
        {
            rights?.length > 0 && rights.map((right, idx) => (
                <LicenseRightBtn key={ 'li-btn-' + idx } text={right.code} />
            ))
        }
    </div>
  )
}

export default LicenseRightButtons