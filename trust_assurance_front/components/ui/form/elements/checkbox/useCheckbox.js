function useCheckbox() {
    function getCheckedList(checkBoxList) {
        const checkedItems = []

        for (const fieldName in checkBoxList) {
            if (checkBoxList[fieldName].value === "true") {
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

export function useCheckboxGroup(checkBoxList) {
    const transformedCheckboxGroup = checkBoxList.reduce((result, item) => {
        const theFieldName = toCamelCase(item.name)

        result[theFieldName] = {
            value: item.checked ? "true" : "false",
            error: null,
        }
        return result
    }, {})
    return {
        transformedCheckboxGroup,
    }
}

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str) {
    // Using replace method with regEx
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, "")
}
