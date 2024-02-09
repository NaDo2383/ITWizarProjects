import React from 'react'
import useForm from 'components/ui/form/store/useForm'
import tw from 'tailwind-styled-components'

function MediaRadioGroup(props) {
    const { children, flexdirection } = props
    const { onChangeGroupRadioButton } = useForm()
    const handleRadioButtonChange = (fieldName, name, checked) => {
        onChangeGroupRadioButton(fieldName, name, checked)
    }
    return (
        <RadioButtonContainer flexdirection={flexdirection}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        onChange: (fieldName, name, e) => {
                            if (e.target.checked === true) {
                                handleRadioButtonChange(fieldName, name, e.target.checked)
                            }
                        },
                    })
                }
                return child
            })}
        </RadioButtonContainer>
    )
}

const RadioButtonContainer = tw.div`
    grid
    md:grid-cols-4
    grid-cols-2
    w-full
    ${(props) => (props.flexdirection === 'column' ? 'flex-col' : 'flex-row')}
    ${(props) => (props.flexdirection === 'column' ? 'gap-2' : 'gap-0')}
    
    whitespace-nowrap
    bg-white
`

export default MediaRadioGroup
