import { WalletProvider } from "./useWalletContext"
import Wallets from "./Wallets"

function RegisteredWallets() {
  return (
    <WalletProvider>
        <Wallets />
    </WalletProvider>
  )
}

export default RegisteredWallets