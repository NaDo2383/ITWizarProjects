"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useApiConnections from '../../../features/connections/useApiConnections'
import { useGlobalCtx } from '../../../common/global/useGlobalCtx';
import Card from '../../../components/card';
import SocialInsuranceTable from "../../../components/loanHolders/SocialInsuranceTable"
import ZmsTable from "../../../components/loanHolders/ZmsTable"
import RatioIndicatorTable from "../../../components/loanHolders/RatioIndicatorTable"
import IncomeIndicator from "../../../components/loanHolders/IncomeIndicator"
import ScoreTable from "../../../components/loanHolders/ScoreTable"
import InformationTable from "../../../components/loanHolders/InformationTable"

export default function LoanHolderDetail({ params }) {
    const { getLoanHolderDetailData } = useApiConnections();
    const { loanHolderDetail } = useGlobalCtx();
    const [scoreData, setScoreData] = useState()
    const [scoreFooterData, setScoreFooterData] = useState()

    useEffect(() => {
        params && getLoanHolderDetailData(params.id)
    }, [params])

    useEffect(() => {
        if (loanHolderDetail) {
            const tempArr = loanHolderDetail.score.scoreInfos.map(info => ({
                ...info,
                difference: info.maxPoint - info.point
            }));
            setScoreData(tempArr.sort((a,b)=>a.order - b.order))
            const temp1 = tempArr.reduce((accumulator, currentValue) => {
                accumulator.point += currentValue.point;
                accumulator.maxPoint += currentValue.maxPoint;
                accumulator.difference += currentValue.difference;
                return accumulator;
            }, { point: 0, maxPoint: 0, difference: 0 })
            setScoreFooterData(temp1)
        }
    }, [loanHolderDetail])

    return (
        <div className='mt-5 h-auto flex flex-col gap-12'>
            <div className='flex flex-col 4xl:flex-row justify-center gap-12'>
                <div className='flex flex-col'>
                    <InformationTable loanHolderDetail={loanHolderDetail} />
                    <RatioIndicatorTable loanHolderDetail={loanHolderDetail} />
                    <ZmsTable tableData={loanHolderDetail?.zms} />
                </div>
                <div className='flex flex-col'>
                    <ScoreTable tableData={scoreData} footerData={scoreFooterData} />
                    <SocialInsuranceTable tableData={loanHolderDetail?.ndsh} />
                    <IncomeIndicator incomeIndicator={loanHolderDetail?.incomeIndicator} />
                </div>
            </div>
            <div className='flex mx-auto'>

            </div>
        </div>
    )
}
