import React from 'react'
import NotificationSettingsTable from './notificationSettingsTable';
import { NotificationSettingsProvider } from './useNotificationSettingsContext';

function NotificationSetting() {
  return (
    <NotificationSettingsProvider>
      <NotificationSettingsTable />
    </NotificationSettingsProvider>
  )
}

export default NotificationSetting