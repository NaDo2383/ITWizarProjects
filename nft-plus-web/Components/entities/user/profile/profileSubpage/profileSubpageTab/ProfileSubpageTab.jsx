/**
 * @createdBy duka
 * @MaintainedBy Phill Anderson 2023/6/27
 */
import React from 'react'
import ProfileTabHeader from './ProfileTabHeader';
import LicenseAgreementPage from '../subpages/licenseAgreement/LicenseAgreement';
import OwnershipTransaction from '../subpages/activityHistory/ActivityHistory';
import ProfileDesc from '../../profileBanner/ProfileDesc';
import ArtworkRegProgress from '../subpages/issuedNft/IssuedNFT';
import PurchasedNft from '../subpages/purchasedNft/PurchasedNft';
import DesiredNft from '../subpages/desiredNft/DesiredNft';
import useSubpage from '../useSubpage';
import { useGlobalContext } from 'common/global/useGlobalContext';

const subPages = [
    <ArtworkRegProgress key={"vm fdkolasg"} />,
    <LicenseAgreementPage key={"vm fdkolasgfds"} />,
    <PurchasedNft key={"vm fdkolasgfdsafdsa"} />,
    <DesiredNft key={"vm fdkolasfdsafdsag"} />,
    <OwnershipTransaction key={"vfdkolasg"} />
]

const normalSubPages = [
    <PurchasedNft key={"vm fdkolasfdsafg"} s />,
    <LicenseAgreementPage key={"vmfdsafewkolasg"} />,
    <DesiredNft key={"vmfedsafgdkolasg"} />,
    <OwnershipTransaction key={"vm fdkolasg fdsa"} />
]
function ProfileMyPage() {
    const { activeSubpageIdx } = useSubpage()
    const { authUser } = useGlobalContext()
    // анх удаагаа бүртгүүлэн орж буй хэрэглэгчид ArtworkRegProgress харагдахгүй
    return (
        <div className='w-full'>
            <ProfileDesc />
            <ProfileTabHeader />
            {
                authUser?.role === "NORMAL" ?
                    normalSubPages[activeSubpageIdx]
                    :
                    subPages[activeSubpageIdx]
            }
        </div>
    )
}

export default ProfileMyPage