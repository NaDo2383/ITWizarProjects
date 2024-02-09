import React from "react";
import { NotificationProvider } from "Components/entities/notification/useNotificationContext";
import dynamic from "next/dynamic";
const  ProtectedPage = dynamic(() => import("Components/entities/user/auth/ProtectedRoute"), { ssr: false }) 
const  ClientSideNotificationPage = dynamic(() => import("Components/entities/notification"), { ssr: false }) 

export default function Notifications() {
  return (
    <NotificationProvider>
      <ProtectedPage>
        <div className="container mx-auto">
          {/* <NotificationLog /> */}
            <ClientSideNotificationPage />
        </div>
      </ProtectedPage>
    </NotificationProvider>
  )
}
