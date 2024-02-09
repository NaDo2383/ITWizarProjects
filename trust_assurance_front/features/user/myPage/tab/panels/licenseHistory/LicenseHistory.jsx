import React from 'react'
import TabPanel from '@/components/ui/tab/_partials/TabPanel'
import LicenseTable from './table/LicenseTable'

function LicenseHistory() {
    return (
        <TabPanel>
            <LicenseTable />
        </TabPanel>
        )
}

export default LicenseHistory
