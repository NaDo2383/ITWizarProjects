import { useMetamaskCtx } from "@/common/metamask/useMetamaskCtx";
import MainPopup from "@/common/popup/_partials/MainPopup";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { OutlineBtn } from "@/components/ui/button/OutlineBtn";
import { Flex } from "@/components/ui/containers/flex/Flex";
import React from "react";
import styled from "styled-components";
import useUserWallet from "../useUserWallet";
import { getAuthToken } from "@/common/token/token";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import useToken from "@/common/token/useToken";
import { useState } from "react";
function WalletListPopup() {
  const { wallet } = useMetamaskCtx();
  const { hidePopup, store } = usePopupCtx()
  const { setGlobalItems } = useGlobalCtx()
  const { checkWallet, updateWalletAddress } = useUserWallet()
  const { getAuthToken } = useToken();
  const [token, setToken] = useState();

  async function handleChooseWallet(chosenWalletAddress) {
    const res = await checkWallet(chosenWalletAddress)
    const checkResStatus = res.status
    getAuthToken().then(async (res) => {
      setToken(res)


      if (res) {
        if (checkResStatus === 200) {
          if (!res.data.walletCheck) {
            alert('this wallet address is already registered!')
            return
          }

          const payload = {
            accessToken: res,
            walletAddress: chosenWalletAddress
          }
          const updateRes = await updateWalletAddress(payload)
          if (updateRes.status === 200) {
            // backend нь response - oo ингэж явуулсан
            if (updateRes.data.updatewallet_address === "true") {
              setGlobalItems(prev => ({
                ...prev,
                chosenWalletAddress
              }))
              hidePopup()
            } else {
              alert('doesnt update this wallet address')
              return
            }
          }
          // сонгосон wallet - ийн утгыг форм руу set-лэнэ
          // updateChosenWalletAddress(chosenWalletAddress)
          return
        }
      }
      if (checkResStatus === 400) {
        alert('wrong data!')
        return
      }
    });
  }

  return (
    <MainPopup title="Choose wallet">
      <Flex column gap={10}>
        {
          wallet.accounts.length > 0 && wallet.accounts.map((wallet, idx) => (
            <OutlineBtn
              key={'wallet-list-item' + idx}
              onClick={() => handleChooseWallet(wallet)}
            >
              {idx + 1}. {wallet}
            </OutlineBtn>
          ))
        }
      </Flex>
    </MainPopup>
  );
}

export const WalletListItem = styled.button`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  &:last-child {
    border-bottom: none;
  }
`

export default WalletListPopup;
