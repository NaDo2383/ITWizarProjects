function useCheckbox() {
    function getCheckedList(checkBoxList: any) {
        const checkedItems: any[] = []

        for (const fieldName in checkBoxList) {
            if (checkBoxList[fieldName].value === 'true') {
                checkedItems.push({
                    fieldName,
                    checked: Boolean(checkBoxList[fieldName].value),
                })
            }
        }
        return checkedItems
    }

    return {
        getCheckedList,
    }
}

export default useCheckbox

export function useCheckboxGroup(checkBoxList: any) {
    const transformedCheckboxGroup = checkBoxList.reduce((result: any, item: any) => {
        const theFieldName = toCamelCase(item.name)

        result[theFieldName] = {
            value: item.checked ? 'true' : 'false',
            error: null,
        }
        return result
    }, {})
    return {
        transformedCheckboxGroup,
    }
}

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str: string) {
    // Using replace method with regEx
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}
