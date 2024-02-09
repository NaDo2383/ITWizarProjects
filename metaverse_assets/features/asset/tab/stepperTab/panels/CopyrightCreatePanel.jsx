import Form from 'a/components/ui/form/Form'
import TabPanel from 'a/components/ui/tab/_partials/TabPanel'
import CopyrightCreateForm from 'a/features/asset/form/CopyrightCreateForm'
import React from 'react'

function CopyrightCreatePanel() {
    return (
        <TabPanel>
            <Form>
                <CopyrightCreateForm />
            </Form>
        </TabPanel>
    )
}

export default CopyrightCreatePanel
