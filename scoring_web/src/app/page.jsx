"use client";
import { redirect, useRouter } from "next/navigation";
import { useUserCtx } from "./features/user/useUserContext";
import { getCookie } from "./common/storage/cookieStorage";
import { useEffect } from "react";

export default function Home() {
    const { userInfo, setUserInfo } = useUserCtx();
    const { push } = useRouter();
    useEffect(() => {
        if (!userInfo) {
            const userData = typeof window !== "undefined" && getCookie("userInfo");
            userData && setUserInfo(JSON.parse(userData));
        }
    }, []);

    if (userInfo) {
        if (userInfo.type === "ROLE_TESTER") {
            push("/form");
        } else {
            push("/admin/default");
        }
    } else {
        push("/admin/default");
    }
}
