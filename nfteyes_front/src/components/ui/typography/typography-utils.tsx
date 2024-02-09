import tw from 'tailwind-styled-components'

export const DangerText = tw.span`
    text-red-400
`

export const UnderlineText = tw.span`
    underline
`
export const Label = tw.label`
    text-gray-50
    text-20
    leading-normal
`

export const PinkParagraph = (props: JsxChildren) => {
    return <p className="text-18 text-pinkText leading-26 tracking-tight">{props.children}</p>
}
