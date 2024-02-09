import TabPanel from '@/components/ui/tab/_partials/TabPanel'
import React from 'react'
import SalesRegStatusTable from './table/SalesRegStatusTable'

function SalesRegistrationStatus() {
  return (
    <TabPanel>
        <SalesRegStatusTable />
    </TabPanel>
  )
}

export default SalesRegistrationStatus