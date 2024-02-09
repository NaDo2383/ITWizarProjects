// array - ийн элэмэнтүүдийг өгөгдсөн урттайгаар хуваана
export async function sliceIntoChunks(arr: [], chunkSize: number) {
    if (!arr) {
        alert('array baihgui')
    }
    if (!chunkSize) {
        alert('хэдээр хуваах вэ? chunkSize оруулна уу')
        return
    }

    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize)
        res.push(chunk)
    }
    return res
}

// multipleDelete from array
export function deleteItemsById(arr: Array<any>, ids: Array<number>) {
    return arr.filter((item) => !ids.includes(item.id))
}
