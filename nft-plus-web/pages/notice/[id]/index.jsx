import React from "react";
import dynamic from "next/dynamic";
import { NoticeProvider } from "Components/entities/notice/useNoticeContect";
import Seo from "common/seo/Seo";

const NoticeDetailPage = dynamic(
	() => import("Components/entities/notice/noticeDetail/index"),
	{
		ssr: false
	}
);

export default function NoticeDetail() {
	return (
		<>
			<Seo title="Notice"/>
			<NoticeProvider>
				<NoticeDetailPage />
			</NoticeProvider>
		</>
	);
}
