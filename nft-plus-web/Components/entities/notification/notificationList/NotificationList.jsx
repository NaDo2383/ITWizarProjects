import React, { useEffect, useRef, useState } from 'react'
import NotificationBox from './NotificationBox'
import Image from 'next/image'
import useScroll from 'common/window/useScroll'
import useElementPosition from 'common/window/useElementPosition'
import { motion } from 'framer-motion'
import useNotification from '../useNotification'
import NotificationSkeletonList from './NotificationSkeletonList'
import Link from 'next/link'
import useAuthUser from 'Components/entities/user/auth/useAuthUser';

function NotificationList() {
    const { authUser } = useAuthUser();
    const notificationListRef = useRef(null)
    const [isExpand, setIsExpand] = useState(false)
    const {
        debouncedCurrentElScroll,
        scroll,
        refScroll
    } = useScroll(notificationListRef, { reCalculate: isExpand })
    const { refObjectData, setRefObjectData } = useElementPosition(notificationListRef, { reCalculate: isExpand })
    const {
        getNotifications,
        notifications,
        pageNum,
        paginate,
        setPageNum,
        scrollNotifications,
        notificationLoading
    } = useNotification()


    function handleExpand() {
        setIsExpand(prev => !prev)
    }

    useEffect(() => {
        if (notificationListRef.current) {
            const timer = setTimeout(() => {
                setRefObjectData((prev) => ({
                    ...prev,
                    clientData: { clientHeight: notificationListRef?.current.clientHeight }
                }))
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isExpand])

    useEffect(() => {
        if (refScroll.scrollTop + refObjectData.clientData.clientHeight === refScroll.scrollHeight) {
            // энэ үед notifications - ийн дараагийн хуудсыг дуудах функц хэрэгтэй
            setPageNum(prev => prev + 1)
        }
    }, [refScroll])

    useEffect(() => {
        if (pageNum > 0) {
            // fetch infinite scroll notifications
            getNotifications({ size: 10, page: pageNum }, true).then((res) => {
            })
        }
    }, [pageNum])

    useEffect(() => {
        getNotifications({ size: 10, page: 0 }).then((res) => {
          //  console.log(res)
        })
        return () => setIsExpand(false)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className={`relative px-[20px] pt-[10px] pb-[38px] bg-[#080808] rounded-xl leading-[18px] -tracking-[1.5%]`}
        >
            <div className='flex justify-center relative py-5 border-b border-[#B4B4B4] mr-[15
                px]'>
                <h3 className='text-[#CBCBCB] text-[20px] font-semibold'>
                    알림
                </h3>
                <Link href={`/mypage?subpage=editProfile&extrasubpage=notification-settings`} passHref>
                    <div className='absolute top-[50%] right-0 -translate-y-[50%] cursor-pointer'>
                        <Image src='/setting.svg' alt='settings-icon' width={20} height={20} />
                    </div>
                </Link>
            </div>
            <div
                ref={notificationListRef}
                className={`flex flex-col gap-1 w-[420px] md:w-[460px] ${isExpand ? 'h-[620px]' : 'h-[385px]'} transition-all duration-500  overflow-y-scroll mt-2 pt-2 pr-2 scroll--narrow`}
            >
                {
                    notificationLoading ?
                        <NotificationSkeletonList />
                        :
                        notifications?.content?.map((item, idx) => (
                            <NotificationBox key={'notification' + idx} {...item} />
                        ))
                }

                {
                    notificationLoading ?
                        <NotificationSkeletonList />
                        :
                        scrollNotifications?.length > 0 && scrollNotifications.map((item, idx) => (
                            <NotificationBox key={'infinite-scrolled-notification' + idx} {...item} />
                        ))
                }
            </div>
            <button className={`absolute bottom-[15px] left-[20px] ${isExpand ? 'rotate-180' : 'rotate-0'}`} onClick={handleExpand}>
                <Image src='/arrow-left-down.svg' width={14} height={14} alt='left-down-arrow' />
            </button>
        </motion.div>
    )
}

export default NotificationList