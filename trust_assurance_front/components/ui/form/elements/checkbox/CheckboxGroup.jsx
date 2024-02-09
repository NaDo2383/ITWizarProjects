import React from 'react'
import useForm from '@/components/ui/form/store/useForm'
import styled from 'styled-components'

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}

function CheckboxGroup(props) {
    const { groupName, children } = props
    const { onChangeGroupCheckbox } = useForm()
    // const { toCamelCase } = useString()
    return (
        <CheckBoxContainer>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const fieldName = toCamelCase(child.props.name)
                    return React.cloneElement(child, {
                        onChange: (e) => onChangeGroupCheckbox(groupName, fieldName, e.target.checked), // Pass the modified onChange
                    })
                }
                return child
            })}
        </CheckBoxContainer>
    )
}

const CheckBoxContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
`

export default CheckboxGroup
