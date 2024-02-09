import React from 'react'
import UserList from './UserList'
import UserDetail from './UserDetail'
import Flex from 'components/ui/containers/flex/Flex'
import UserAddForm from './form/UserAddForm'
import { FormProvider } from 'components/ui/form/store/useFormCtx'
import SimpleTab from 'components/ui/tab/choices/simpleTab/SimpleTab'
import SimpleAccordion from 'components/ui/accordion/choices/simpleAccordion/SimpleAccordion'
import ProgressBar from 'components/ui/progressBar/ProgressBar'
import useProgressBar from 'components/ui/progressBar/useProgressBar'

const UserPage = () => {
    // const users = useAxiosData<IUser[]>('https://jsonplaceholder.typicode.com/users')
    const { progress, isEnded } = useProgressBar(100)

    return (
        <Flex gap={10}>
            <Flex gap={10} column between>
                <FormProvider>
                    <UserAddForm />
                </FormProvider>
                <Flex gap={10}>
                    <UserList />
                    <UserDetail />
                </Flex>
            </Flex>
            <Flex gap={10} column>
                <SimpleTab name={'simpleTab'} />
                <SimpleAccordion />
                <ProgressBar progress={progress} isEnded={isEnded} />
            </Flex>
        </Flex>
    )
}

export default UserPage
