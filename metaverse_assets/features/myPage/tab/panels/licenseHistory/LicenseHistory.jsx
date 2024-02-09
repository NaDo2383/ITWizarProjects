import React, { useEffect, useState } from 'react'
import TabPanel from 'a/components/ui/tab/_partials/TabPanel'
import Table from 'a/components/ui/table/Table'
import useAsset from 'a/features/asset/useAsset'
import { useAssetCtx } from 'a/features/asset/useAssetCtx'
import { useUserCtx } from 'a/features/user/useUserCtx'
import { licenseTypes } from 'a/components/layout/sideBar/SideFilter'
import Pagination from 'a/components/ui/pagination/Pagination'

const tableHeader = [
    '에셋 이름',
    '저작권 유형',
    '저작권자',
    '트랜잭션 해쉬',
    '라이선스 계약일',
]
let counter = 2
const interval = 3000
let refTimeOut = null

function LicenseHistory() {
    const { getLicenseHistoryList } = useAsset()
    const { licenseHistoryList } = useAssetCtx()
    const { userInfo } = useUserCtx()
    const [tableData, setTableData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (userInfo?.walletAddress) {
            getLicenseHistoryList(userInfo?.walletAddress, currentPage)
        }
    }, [currentPage, userInfo?.walletAddress])

    const callAPi = () => {
        if (userInfo?.walletAddress) {
            getLicenseHistoryList(userInfo?.walletAddress, currentPage)
        }
        counter -= 1
        if (counter > 0) {
            refTimeOut = setTimeout(callAPi, interval)
        }
    }

    useEffect(() => {
        refTimeOut = setTimeout(callAPi, interval)
        return () => clearTimeout(refTimeOut)
    }, [userInfo?.walletAddress])

    useEffect(() => {
        const items = []
        licenseHistoryList?.items?.forEach((item) => {
            let convertedNames = ''
            const convertedCopyrights = []
            let copyright = ''

            item?.copyright_info?.copyrightTypes?.forEach((copyright) => {
                convertedCopyrights.push(licenseTypes?.find((e) => e.code == copyright))
            })

            convertedCopyrights.length > 0 &&
                convertedCopyrights.forEach((e, i) => {
                    if (i === 0) {
                        copyright += e.label
                    } else {
                        copyright += ', ' + e.label
                    }
                })

            item?.copyright_info?.copyrightInfo?.ownerNames?.forEach((name, index) => {
                if (index === 0) {
                    convertedNames += name
                } else {
                    convertedNames += ', ' + name
                }
            })

            items.push({
                asset_name: item?.asset_name,
                copyright_type: copyright,
                copyright_holder: convertedNames,
                transaction_hash: item?.transaction_hash.slice(0, 14) + '...',
                license_agreeement_date: item?.updated.substring(0, 10),
            })
        })
        setTableData(items)
    }, [licenseHistoryList?.items])

    return (
        <>
            <TabPanel>
                <Table items_offer_data={tableData} tableHeader={tableHeader} />
            </TabPanel>
            <Pagination
                totalProductCount={licenseHistoryList?.totalElements}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={licenseHistoryList?.totalPages}
            />
        </>
    )
}

export default LicenseHistory
