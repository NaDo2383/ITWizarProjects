import React, { useState, useEffect } from "react";
import Row from "Components/ui/table/Row";
import useMyPageTranslation from 'locale/useMypageTranslation'
import useNotificationSettings from "./useNotificationSettings";
import SwitchButton from "Components/ui/button/switchBtn";
import useArtworkTranslation from "locale/useArtworkTranslation";

function NotificationSettingsTable() {
    const { notificationSettings, getNotificationSettings, count } = useNotificationSettings()
    const { likeI18 } = useArtworkTranslation();
    const {
        notification_settingI18,
        LICENSE_BUYI18,
        LICENSE_SELLERI18,
        NFTI18,
        ARTWORKI18,
    } = useMyPageTranslation()
    const [editMode, setEditMode] = useState(false);

    function save() {
        setEditMode(false)
    }

    function handleButton() {
        save()
    }

    useEffect(() => {
        getNotificationSettings()
    }, [])

    return (
        <div className='w-full mb-[200px]'>
            <h3 className='lg:text-[22px] sm:text-[22px] text-[20px] font-[700] lg:text-left sm:text-left xs:text-center text-center text-[#D4D4D4]'>{notification_settingI18}</h3>
            <div className="my-[41px]">
                <Row title={ARTWORKI18}>
                <SwitchButton
                        change={() => notificationSettings({ id: count[0]?.id, active: !count[0]?.notificationActive })}
                        on={count[0]?.notificationActive}
                    />
                </Row>
                <Row title={LICENSE_SELLERI18}>
                <SwitchButton
                        change={() => notificationSettings({ id: count[1]?.id, active: !count[1]?.notificationActive })}
                        on={count[1]?.notificationActive}
                    />
                </Row>
                <Row title={NFTI18}>
                <SwitchButton
                        change={() => notificationSettings({ id: count[2]?.id, active: !count[2]?.notificationActive })}
                        on={count[2]?.notificationActive}
                    />
                </Row>
                <Row title={LICENSE_BUYI18}>
                <SwitchButton
                        change={() => notificationSettings({ id: count[3]?.id, active: !count[3]?.notificationActive })}
                        on={count[3]?.notificationActive}
                    />
                </Row>
                <Row title={likeI18}>
                    <SwitchButton
                        change={() => notificationSettings({ id: count[4]?.id, active: !count[4]?.notificationActive })}
                        on={count[4]?.notificationActive}
                    />
                </Row>
            </div>
           {/* <div className='edit-btn-container'>
                <button onClick={handleButton} className='edit-btn text-[18px] font-[500] text-white  border-[#252525] bg-[#252525]'>{saveI18}</button>
            </div>
    */}
        </div>
    )
}

export default NotificationSettingsTable;