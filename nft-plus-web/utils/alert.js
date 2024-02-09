export function timeOutAlert( message, delay = 5 ) {
    return setTimeout(() => {
        alert(message)
    }, [delay * 1000 ])
}