import { useGlobalContext } from "common/global/useGlobalContext";
import Link from "next/link";

const Dropdown = ({ subMenus, dropdown }) => {
  const { isOpenMobileMenu, setOpenMobileMenu } = useGlobalContext()

  function handleOnClick() {
    setOpenMobileMenu(!isOpenMobileMenu)
  }

  return (
    <div
      className={`dropdown-submenu flex flex-col ${dropdown ? 'show' : 'hidden'
        } `}
    >
      {subMenus.map((subMenu, index) => {
        return (
          <Link key={"MobileSubMenu" + index} href={subMenu.href} passHref>
            <a
              onClick={handleOnClick}
              style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 400,
                letterSpacing: '-0.015em',
                lineHeight: '26px',
              }}
            >
              {subMenu.text}
            </a>
          </Link>
        )
      })}
    </div>
  );
};

export default Dropdown;
