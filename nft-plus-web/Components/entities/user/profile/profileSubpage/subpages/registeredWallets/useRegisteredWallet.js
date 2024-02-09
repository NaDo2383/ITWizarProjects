import { useWalletContext } from './useWalletContext'

function useRegisteredWallet() {

    const { 
        activeWallets, 
        setActiveWallets,
        activeIndex, 
        setActiveIndex,
        copied, 
        setCopied,
        walletLoading, 
        setWalletLoading,
    } = useWalletContext() 
  
    async function copyClipboard(text) {
            try {
                navigator.clipboard.writeText(text);
                return true
            } catch(e) {
                throw new Error(e)
            }
    }

    //@createdBy Narada0927
    const copyWalletHandler = (index, text) => {
            setCopied(true);
            setActiveIndex(index);
            if (navigator.clipboard && window.isSecureContext) { 
                copyClipboard(text).then( (isCopied) => {
                    if(!isCopied) return
                    
                    setTimeout(() => {
                        setCopied(false)
                    }, [1500])
                
                })
            }
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = text;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                document.execCommand("copy") ? res() : rej();
                textArea.remove();
            });
    }

  return {
    activeWallets,
    getActiveWallets,
    copyWalletHandler,
    copied,
    activeIndex,
    setActiveIndex,
    handleAddWallet,
    walletLoading
  }
}

export default useRegisteredWallet