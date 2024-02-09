/**
 * @createdBy Phill Anderson 2023/5/22
 */
import Head from "next/head";

function Seo(props) {
	const { title, pageDesc, keyWords, preloadImg } = props;
	return (
		<Head>
			<title>{title ? `탐탐 TAMTAM | ${title}` : '탐탐 TAMTAM'}</title>
			{preloadImg && <link rel="preload" href={preloadImg} as="image" />}
			<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="description"
				content={
					pageDesc
						? pageDesc
						: "디지털 아트의 모든 권리를 거래하는 NFT 마켓 플레이스 탐탐"
				}
			/>
			<meta
				name="keywords"
				content={
					(keyWords ? keyWords : "") +
					", 탐탐, NFT, 탐탐 NFT 마켓 플레이스, NFT 마켓, NFT 마켓플레이스, 탐탐 마켓, TAMTAM, TAMTAM NFT, NFT 아트, NFT 사진, NFT 그림, NFT 거래소, NFT 민팅, NFT 코인"
				}
			/>
		</Head>
	);
}
export default Seo;
