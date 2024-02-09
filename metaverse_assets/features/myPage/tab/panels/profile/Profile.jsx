import React from 'react'
import Form from 'a/components/ui/form/Form'
import TabPanel from 'a/components/ui/tab/_partials/TabPanel'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import ProfileDetail from './ProfileDetail'
import ProfileEditForm from './ProfileEditForm'

function Profile() {
    const { myPageState } = useGlobalCtx()
    return (
        <TabPanel>
            {myPageState?.isProfileEdit ? (
                <Form>
                    <ProfileEditForm />
                </Form>
            ) : (
                <ProfileDetail />
            )}
        </TabPanel>
    )
}
export default Profile
