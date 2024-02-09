import Dropdown from '../../dropdown/Dropdown'
import tw from 'tailwind-styled-components'
import useDropdown from '../../dropdown/useDropdown'

function DropdownMenu() {
    const { isShow, setIsShow, handleDropdown, ref } = useDropdown()
    return (
        <DropdownWrapper ref={ref}>
            <DropdownBtn onClick={handleDropdown}>DropdownMenu</DropdownBtn>
            <Dropdown isShow={isShow} setIsShow={setIsShow}>
                <ul>
                    <li>dropdown item 1</li>
                    <li>dropdown item 2</li>
                    <li>dropdown item 3</li>
                    <li>dropdown item 4</li>
                    <li>dropdown item 5</li>
                </ul>
            </Dropdown>
        </DropdownWrapper>
    )
}

const DropdownWrapper = tw.div`
    relative
    w-fit
`
const DropdownBtn = tw.button`

`

export default DropdownMenu
