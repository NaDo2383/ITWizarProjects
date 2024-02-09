import parse from 'html-react-parser'

function useString() {
    function excrept(text: string, maxLength: number): string {
        const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
        return truncatedText
    }

    function convertString(text: string) {
        const string = JSON.stringify(text)
        return string
    }
    function renderParsedString(str: string) {
        return parse(str)
    }

    function subStr(string: string, maxLength = 10) {
        if (string?.length < maxLength) {
            return string
        }

        const halfString = string?.substr(0, maxLength) + '...'
        return halfString
    }

    function validStr(longString: string, string: string) {
        if (longString === '') return false
        const isValid = longString.includes(string)
        return isValid
    }

    function toCamelCase(str: string) {
        // Using replace method with regEx
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase()
            })
            .replace(/\s+/g, '')
    }

    return {
        toCamelCase,
        excrept,
        convertString,
        renderParsedString,
        subStr,
        validStr,
    }
}

export default useString
