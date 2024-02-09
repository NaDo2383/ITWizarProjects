export function checkFileExtension(file) {
    const fileType = file?.type
    const fileExtension = fileType?.split('/')[1]

    let isValid = false
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg']

    allowedExtensions.forEach((extension) => {
        if (fileExtension === extension) {
            isValid = true
        }
    })

    return isValid ? 'success' : 'jpg, jpeg, png өргөтгөлтэй файл биш байна'
}
