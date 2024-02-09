import React from 'react'
import useForm from 'components/ui/form/store/useForm'
import { TCheckbox } from './Checkbox'
// import useString from 'common/string/useString';

type TCheckboxGroup = {
    groupName: string
    // eslint-disable-next-line
    children: React.ReactElement<TCheckbox>[]
}

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str: string) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
}

function CheckboxGroup(props: TCheckboxGroup) {
    const { groupName, children } = props
    const { onChangeGroupCheckbox } = useForm()
    // const { toCamelCase } = useString()
    return (
        <div>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // console.log('child', child)
                    const fieldName = toCamelCase(child.props.name)
                    return React.cloneElement(child, {
                        onChange: (e: any) => onChangeGroupCheckbox(groupName, fieldName, e.target.checked), // Pass the modified onChange
                    })
                }
                return child
            })}
        </div>
    )
}

export default CheckboxGroup
