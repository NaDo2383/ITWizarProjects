import React, { useEffect } from 'react';
import Dropdown from '../dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from '../link/NavLink';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import avatar from '/public/img/avatars/avatar4.png';
import Image from 'next/image';
import { useUserCtx } from '../../features/user/useUserContext';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from '../../common/storage/cookieStorage';

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark'),
  );
  const { userInfo, setUserInfo } = useUserCtx()
  const { push } = useRouter();

  const logOut = () => {
    setUserInfo(null)
    deleteCookie("userInfo")
    deleteCookie("scoringCoookie")
    push('/login')
  }

  useEffect(() => {
    if (!userInfo) {
      const userData = typeof window !== "undefined" && getCookie("userInfo")
      userData && setUserInfo(JSON.parse(userData))
    }
  }, [])

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        {/* <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p> */}
      </div>

      <div className="relative mt-[3px] flex h-[61px] max-w-[355px] min-w-[150px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:max-w-[365px] md:flex-grow-0 md:gap-1 xl:max-w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:max-w-[225px]">
          {userInfo ?
            <p className="text-sm font-bold text-navy-700 dark:text-white mx-3">
              {`👋 Hey, ${userInfo?.username}`}
            </p>
            :
            <p onClick={() => push("/login")} className="text-sm cursor-pointer font-bold text-navy-700 dark:text-white mx-3">
              Login
            </p>}
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove('dark');
              setDarkmode(false);
            } else {
              document.body.classList.add('dark');
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        {
          userInfo &&
          <Dropdown
            button={
              <Image
                width="2"
                height="20"
                className="h-10 w-10 rounded-full"
                src={avatar}
                alt="Elon Musk"
              />
            }
            classNames={'py-2 top-8 -left-[180px] w-max'}
          >
            <div className="flex h-36 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 mt-3">
                <div className="flex items-center gap-2">
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="ml-4 mt-3 flex flex-col">
                <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <div
                  onClick={() => logOut()}
                  className="mt-3 text-sm cursor-pointer font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </div>
              </div>
            </div>
          </Dropdown>
        }
      </div>
    </nav>
  );
};

export default Navbar;
