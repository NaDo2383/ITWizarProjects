import useGlobal from "common/global/useGlobal";
import Link from "next/link";
import React, { useEffect} from "react";
import { VscBell } from "react-icons/vsc";

function Notifications() {
  const { unreadNotiCount, getNotificationCount } = useGlobal();

  useEffect(() => {
    getNotificationCount();
  }, []);

  return (
    <Link href="/notifications" passHref>
      <a>
        <div className="relative text-3xl text-[#333] cursor-pointer">
          {unreadNotiCount > 0 && (
            <div className="absolute w-[10px] h-[10px] right-0.5 top-px rounded-full bg-[#ff00e4]" />
          )}
          <VscBell />
        </div>
      </a>
    </Link>
  );
}

export default Notifications;
