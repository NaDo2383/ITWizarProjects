/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import logo from '/public/img/auth/logo2.png';

function SidebarHorizon(props) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`min-w-[300px] sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
        }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`w-full h-[110px] flex items-center`}>
        <div className="w-full h-full bg-contain bg-center bg-no-repeat text-navy-700 dark:text-white"
          style={{ backgroundImage: `url(${logo.src})` }}
        >
        </div>
      </div>
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
    </div>
  );
}

export default SidebarHorizon;
