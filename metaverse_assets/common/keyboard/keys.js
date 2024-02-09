export function preventEnterKey(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
    }
}
