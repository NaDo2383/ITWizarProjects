import { useGlobalContext } from "common/global/useGlobalContext"
import SubmenuItem from "./SubmenuItem";

function SubMenu({ isOpen, bigMenuItems, setActiveMenuIdx }) {
    const { globalItems } = useGlobalContext()
    const leftSpace = globalItems?.adMenu?.clientRect?.left;
    const containerWidth = globalItems?.adMenu?.clientData?.clientWidth;
    const menuItemWidth = globalItems?.adMenuItem?.clientData?.clientWidth;
    const containerStyle = {
        display: `${isOpen ? 'flex' : 'none'}`,
        width: '100%',
        height: `${isOpen ? 'auto' : '0'}`,
        paddingLeft: `${leftSpace}px`,
        opacity: `${isOpen ? '1' : '0'}`,
        paddingTop:'21px',
        paddingBottom: '21px',
    }
    const subMenuStyle = {
       display: 'flex',
       width: `${containerWidth}px`,
       justifyContent: 'space-around',
       gap: "65px"
    }
    const ulStyle = {
        width: `${menuItemWidth}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '10px',
    }
    
    return (
        <div className="hidden md:block bg-[#1F1F1F] bg-opacity-[80%] backdrop-blur-[2px] ">
            <div className="  " style={containerStyle}>
                <div style={subMenuStyle}>
                    {
                        bigMenuItems.map((item, idx) => (
                            <ul key={'subMenu'+ idx} style={ulStyle} className="whitespace-nowrap">
                                {
                                    item.list.map(( subItem, subIdx ) => (
                                        <SubmenuItem 
                                            key={'subItem' + subIdx } 
                                            text={ subItem.text } 
                                            href={ subItem.href } 
                                            onClick={ subItem.onClick } 
                                            setActiveMenuIdx = { setActiveMenuIdx }
                                            parentItem = { item }
                                        />
                                    ))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>    
    )
}

export default SubMenu