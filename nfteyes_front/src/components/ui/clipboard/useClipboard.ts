function useClipboard() {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            alert(`Text copied to clipboard: ${text}`)
        } catch (error: any) {
            alert(`Error copying to clipboard: ${error}`)
        }
    }

    return {
        copyToClipboard,
    }
}

export default useClipboard
