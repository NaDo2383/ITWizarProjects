import React from 'react'
import TabPanel from '@/components/ui/tab/_partials/TabPanel'
import ExistingCerticationUi from './existingCertification/ExistingCerticationUi'
import FormChangerUi from './formChanger/FormChangerUi'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import NewCertificationUi from './newCertification/NewCertificationUi'

function IdentityAuthentication() {
    const { myPageState } = useGlobalCtx()
  
    return (
        <TabPanel>
            <div
                data-wow-delay="0s"
                className="wow fadeInUp col-12"
                style={{ visibility: "visible", animationDelay: "0s" }}
            >
                    <div className="product-item offers">
                        <div className="content">
                            <FormChangerUi />
                            {
                                myPageState?.identityRadioValue?.value === 'existing Certification' ? 
                                    <ExistingCerticationUi /> 
                                :
                                    <NewCertificationUi />
                            }
                           
                        </div>
                    </div>
            </div>            
        </TabPanel>
    )
}

export default IdentityAuthentication
