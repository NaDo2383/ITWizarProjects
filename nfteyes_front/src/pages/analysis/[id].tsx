import { MediumWrapper } from 'components/ui/containers/Wrapper'
import Flex from 'components/ui/containers/flex/Flex'
import ProgressBar from 'components/ui/progressBar/ProgressBar'
import useStatistics from 'features/statistics/useStatistics'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Analysis: NextPage = () => {
    const { getAnalyzeProcessStatus } = useStatistics()
    const [analyzeProcess, setAnalyzeProcess] = useState<number>(0)
    // const { progress, isEnded } = useProgressBar(analyzeProcess)
    const { push, query } = useRouter()
    let timer = 1000
    let timerFunc: any = null
    async function calcProgressPercent(processStatusNumber: number) {
        let percent: number = 10
        switch (processStatusNumber) {
            case 1:
                percent = 25
                break
            case 2:
                percent = 50
                break
            case 3:
                percent = 75
                break
            case 4:
                percent = 100
                break
            default:
                percent = 100
                break
        }
        return percent
    }

    useEffect(() => {
        const fetchData = async () => {
            // // Simulating an asynchronous call
            // await new Promise((resolve) => setTimeout(resolve, 500))
            const res: any = await getAnalyzeProcessStatus(+query?.id!)

            const progressPercent: number = await calcProgressPercent(res?.result)
            setAnalyzeProcess(progressPercent)
            if (progressPercent !== 100) {
                console.log('runs ...')
                timerFunc = setTimeout(fetchData, timer)
            }
        }
        timerFunc = setTimeout(fetchData, timer)
        return () => clearTimeout(timerFunc)
    }, [query])

    useEffect(() => {
        if (analyzeProcess === 100) {
            const timeout = setTimeout(() => {
                push('/analysis/result/' + query.id)
            }, timer + 200)
            return () => clearTimeout(timeout)
        }
    }, [analyzeProcess, query])

    return (
        <MediumWrapper className=" pt-283 px-[37px]">
            <Flex className="flex-col w-full">
                <h3 className="text-center leading-30 mb-68">
                    The similarity analysis {analyzeProcess !== 100 ? 'in progress' : 'has been completed'}.
                </h3>
                <ProgressBar progress={analyzeProcess} isEnded={analyzeProcess === 100} />
                <Flex className="justify-center pt-[44px]">
                    <Image src={'/images/icons/AnalyzeSteps.svg'} width={646} height={152} alt="analyze steps image" />
                </Flex>
                <p className=" text-gray-60 text-center text-25 mt-36 leading-30">
                    You will be redirected to the analysis result screen shortly.
                </p>
            </Flex>
        </MediumWrapper>
    )
}

export default Analysis
