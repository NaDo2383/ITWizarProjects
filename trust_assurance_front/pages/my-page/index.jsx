import { PopupProvider } from '@/common/popup/usePopupCtx'
import Layout from '@/components/layout/Layout'
import ProtectedPage from '@/features/user/auth/ProtectedPage'
import MyPage from '@/features/user/myPage/MyPage'

function Mypage() {
  return (
        <ProtectedPage>
            <PopupProvider>
                <MyPage />
            </PopupProvider>
        </ProtectedPage>
  )
}

export default Mypage