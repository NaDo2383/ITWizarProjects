import ProtectedPage from 'common/auth/jwt/ProtectedPage'
import Flex from 'components/ui/containers/flex/Flex'
import Form from 'components/ui/form/Form'
import { AnalyzeProvider } from 'features/analyze/store/useAnalyzeCtx'
import HistoryTable from 'features/analyze/table/historyTable/HistoryTable'
import { NextPage } from 'next'
import React from 'react'

const HistoryPage: NextPage = () => {
    // console.log('token', token)
    return (
        <ProtectedPage>
            <AnalyzeProvider>
                <Flex className="flex-col w-full">
                    <h1 className="mt-80 text-center">Analysis History</h1>
                    <Form>
                        <HistoryTable noPagination />
                    </Form>
                </Flex>
            </AnalyzeProvider>
        </ProtectedPage>
    )
}

export default HistoryPage
