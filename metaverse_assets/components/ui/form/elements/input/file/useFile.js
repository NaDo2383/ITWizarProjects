import { useState, useRef, useEffect } from 'react'

function useFile(file) {
    const fileRef = useRef(null)
    const [convertedFile, setConvertedFile] = useState(null)

    function convertBase64(file, callback) {
        if (file instanceof Blob) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    callback(reader.result)
                }
            }
            reader.readAsDataURL(file)
        } else {
            console.info('file instanceof not Blob')
        }
    }

    useEffect(() => {
        if (file) {
            convertBase64(file, (base64File) => setConvertedFile(base64File))
        } else {
            setConvertedFile(null)
        }
    }, [file])
    return {
        fileRef,
        convertBase64,
        convertedFile,
        setConvertedFile,
    }
}

export default useFile
