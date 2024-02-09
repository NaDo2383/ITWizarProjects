import React, { forwardRef } from 'react'
import { NotificationProvider } from '../useNotificationContext'
import NotificationList from './NotificationList'
import { AnimatePresence } from 'framer-motion';

const NotificationListUi = (props, ref) => {				
    const { setIsOpenNotifications } = props
    
    return (
        <AnimatePresence>
            <NotificationProvider>
                <div ref={ref} className="absolute top-[100%] right-0 md:right-10 z-[999]">
                    <NotificationList closeNotification={() => setIsOpenNotifications(false)} />
                </div>
            </NotificationProvider>
        </AnimatePresence>
    );
  };
export default forwardRef(NotificationListUi)