/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { createContext, useState, useContext } from 'react'

export const GlobalContext = createContext({})

const initialDate = new Date()
export const tomDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    initialDate.getDate() + 1
)
const initialLicenseForm = {
    rights: {
        value: null,
        error: null,
    },
    applicantName: {
        value: null,
        error: null,
    },
    applicantAddress: {
        value: null,
        error: null,
    },
    applicantContact: {
        value: null,
        error: null,
    },
    licenseEnd: {
        value: tomDate,
        error: null,
    },
    licenseStart: {
        value: tomDate,
        error: null,
    },
    paymentAmount: {
        value: null,
        error: null,
    }, // getLicenseIssuance - ийг дуудаж тооцоолсон утга бга байх
    purpose: {
        value: null,
        error: null,
    },
}

export const GlobalProvider = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false)
    const [isOpenMobileMenu, setOpenMobileMenu] = useState(false)
    const [isOpenMobileEditProfile, setOpenMobileEditProfile] = useState(true)
    const [authUser, setAuthUser] = useState(null)
    const [profileUser, setProfileUser] = useState(null)
    const [activeWallets, setActiveWallets] = useState([])
    const [globalItems, setGlobalItems] = useState({})
    const [isShowFilter, setIsShowFilter] = useState(false)
    const [distance, setDistance] = useState(0)
    const [checkEmail, setCheckEmail] = useState(false)
    const [verifiEmail, setVerifiEmail] = useState(false)
    const [unreadNotiCount, setUnreadNotiCount] = useState(0)
    const [signupState, setSignupState] = useState({
        ipin: null,
        error: null,
        ipinLoader: false,
    })
    const [competitionSettings, setCompetitionSettings] = useState(null)
    const [refs, setRefs] = useState({})
    const [hardRender, setHardRender] = useState(false)
    const [isOpenMobileFilter, setOpenMobileFilter] = useState(false)
    const [licenseRequestForm, setLicenseRequestForm] =
        useState(initialLicenseForm)
    const [rightLists, setRightsLists] = useState(null)
    const [isShowArtistSearchBar, setIsShowArtistSearchBar] = useState(false)
    const [browserWindow, setBrowserWindow] = useState({
        innerWidth: null,
        innerHeight: null,
    })
    const [prevUrl, setPrevUrl] = useState(null)

    return (
        <GlobalContext.Provider
            value={{
                browserWindow,
                setBrowserWindow,
                globalLoading,
                setGlobalLoading,
                authUser,
                setAuthUser,
                profileUser,
                setProfileUser,
                activeWallets,
                setActiveWallets,
                globalItems,
                setGlobalItems,
                isShowFilter,
                setIsShowFilter,
                unreadNotiCount,
                setUnreadNotiCount,
                distance,
                setDistance,
                signupState,
                setSignupState,
                competitionSettings,
                setCompetitionSettings,
                checkEmail,
                setCheckEmail,
                verifiEmail,
                setVerifiEmail,
                isOpenMobileMenu,
                setOpenMobileMenu,
                refs,
                setRefs,
                hardRender,
                setHardRender,
                isOpenMobileFilter,
                setOpenMobileFilter,
                isOpenMobileEditProfile,
                setOpenMobileEditProfile,
                licenseRequestForm,
                setLicenseRequestForm,
                initialLicenseForm,
                rightLists,
                setRightsLists,
                isShowArtistSearchBar,
                setIsShowArtistSearchBar,
                prevUrl,
                setPrevUrl,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
