import React from "react";
import dynamic from "next/dynamic";
import { NoticeProvider } from "Components/entities/notice/useNoticeContect";
import Seo from "common/seo/Seo";

const NoticePage = dynamic(() => import("Components/entities/notice/notice"), {
	ssr: false
});

export default function Notice() {
	return (
		<>
			<Seo title="Notice"/>
			<NoticeProvider>
				<NoticePage />
			</NoticeProvider>
		</>
	);
}
