import React from 'react'

export function LicenseContainer({ children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-[30px] w-full">
        { children }
    </div>
  )
}

export function LicenseFirstCol({ children }) {
  return (
    <div className="flex flex-col gap-4 w-full md:w-[25%]" >
        { children }
    </div>
  )
}

export function LicenseSecondCol({ children }) {
  return (
    <div className="w-full md:w-[75%]">
        { children }
    </div>
  )
}