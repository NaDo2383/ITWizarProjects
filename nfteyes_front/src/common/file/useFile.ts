import { useState, useRef, useEffect } from 'react'

function useFile(file?: File) {
    const fileRef = useRef(null)
    const [convertedFile, setConvertedFile] = useState<any>(null)

    function convertBase64(file: File, callback: (base64: string) => void) {
        const reader: FileReader = new FileReader()
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                callback(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    function checkFileExtension(file: File) {
        const fileType = file.type
        const fileExtension = fileType.split('/')[1]

        let msg: string | undefined | null = null
        let isValid = false
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']

        allowedExtensions.forEach((extension) => {
            if (fileExtension === extension) {
                isValid = true
            }
        })

        if (!isValid) {
            msg = 'jpg, jpeg, png өргөтгөлтэй файл биш байна'
        }
        return msg
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
        checkFileExtension,
        convertBase64,
        convertedFile,
        setConvertedFile,
    }
}

export default useFile
