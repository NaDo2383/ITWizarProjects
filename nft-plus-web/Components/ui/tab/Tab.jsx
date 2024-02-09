/**
 * @createdBy Phill Anderson 2023/3/21
 */
import React from 'react'
import { TabProvider } from './useTabContext'

function Tab({ children }) {
  return (
    <TabProvider>
        { children }
    </TabProvider>
  )
}

export default Tab