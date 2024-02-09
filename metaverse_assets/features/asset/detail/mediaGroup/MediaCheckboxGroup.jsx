import React from 'react'
import useForm from 'components/ui/form/store/useForm'
import tw from 'tailwind-styled-components'

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}

function MediaCheckboxGroup(props) {
    const { groupName, children, flexdirection } = props
    const { onChangeGroupCheckbox } = useForm()
    // const { toCamelCase } = useString()
    const handleCheckboxChange = (groupName, fieldName, checked, item) => {
        const itemObj = item && {
            ...item,
            checked,
        }
        onChangeGroupCheckbox(groupName, fieldName, checked, itemObj)
    }
    return (
        <CheckBoxContainer flexdirection={flexdirection}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const fieldName = toCamelCase(child.props.name)
                    const item = child.props.item
                    return React.cloneElement(child, {
                        onChange: (e) =>
                            handleCheckboxChange(
                                groupName,
                                fieldName,
                                e.target.checked,
                                item
                            ),
                    })
                }
                return child
            })}
        </CheckBoxContainer>
    )
}

const CheckBoxContainer = tw.div`
    grid
    md:grid-cols-4
    grid-cols-2
    w-full
    ${(props) => (props.flexdirection === 'column' ? 'flex-col' : 'flex-row')}
    ${(props) => (props.flexdirection === 'column' ? 'gap-2' : 'gap-0')}
    
    whitespace-nowrap
    bg-white
`

export default MediaCheckboxGroup
