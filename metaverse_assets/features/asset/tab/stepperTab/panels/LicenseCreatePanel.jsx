import Form from 'a/components/ui/form/Form'
import TabPanel from 'a/components/ui/tab/_partials/TabPanel'
import LicenseCreateForm from 'a/features/asset/form/LicenseCreateForm'
import React from 'react'

function LicenseCreatePanel() {
    return (
        <TabPanel>
            <Form>
                <LicenseCreateForm />
            </Form>
        </TabPanel>
    )
}

export default LicenseCreatePanel
