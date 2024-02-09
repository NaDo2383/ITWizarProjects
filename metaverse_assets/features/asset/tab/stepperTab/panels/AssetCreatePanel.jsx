import Form from 'a/components/ui/form/Form'
import TabPanel from 'a/components/ui/tab/_partials/TabPanel'
import AssetCreateForm from 'a/features/asset/form/AssetCreateForm'
import React from 'react'

function AssetCreatePanel() {
    return (
        <TabPanel>
            <Form>
                <AssetCreateForm />
            </Form>
        </TabPanel>
    )
}

export default AssetCreatePanel
