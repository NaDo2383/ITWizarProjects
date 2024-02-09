import React from 'react'
import TabPanel from '@/components/ui/tab/_partials/TabPanel'
import ProfileDetail from './ProfileDetail'
import Form from '@/components/ui/form/Form'
import ChangePasswordForm from './ChangePasswordForm'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import ProfileEditForm from '@/features/user/form/ProfileEditForm'

function Profile() {
    const { myPageState } = useGlobalCtx()
    return (
        <TabPanel>
            <div data-wow-delay="0s" className="wow fadeInUp col-12" style={{ visibility: "visible", animationDelay: "0s" }} id="profileEdit">
                <div className="product-item offers">
                    <div className="content">
                        {
                            myPageState?.isProfileEdit ?
                                <Form>
                                    <ProfileEditForm />
                                </Form>
                                :
                                <ProfileDetail />
                        }
                    </div>
                </div>
            </div>
        </TabPanel>
    )
}

export default Profile
