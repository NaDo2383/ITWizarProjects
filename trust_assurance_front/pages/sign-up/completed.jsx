import React from "react";
import styled from "styled-components";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import LogoIcon from "@/components/ui/icon/LogoIcon";
import Image from "next/image";
import { PopupProvider } from "@/common/popup/usePopupCtx";
function Completed() {
    return (
        <PopupProvider>
            <div id="wrapper">
                <div id="page">
                    <div className="section-single-page items-center">
                        <div className="content">
                            <div className="widget-bg-line">
                                <div className="wraper">
                                    <div className="bg-grid-line y top">
                                        <div className="bg-line" />
                                    </div>
                                    <div className="bg-grid-line x left">
                                        <div className="bg-line" />
                                    </div>
                                    <div className="bg-grid-line y bottom">
                                        <div className="bg-line" />
                                    </div>
                                    <div className="bg-grid-line x right">
                                        <div className="bg-line" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="mb-30 mt-30">
                                회원가입
                            </h3>
                            <Image
                                src="/Completed.png"
                                alt="Completed badge"
                                width={50}
                                height={50}
                            />
                            <h3 className="mb-30 mt-30">
                                회원가입이 완료되었습니다
                            </h3>
                            <Link href="/" className="tf-button style-1 h50">
                                메인페이지로 이동하기
                                <i className="icon-arrow-up-right2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PopupProvider>
    );
}

const Wrapper = styled.div`
    width: 100%;
`;

const CompletedPage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 700px;
    padding-inline: 20px;
    padding-block: 10px;
    background-color: yellow;
`;
const Circle = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: gray;
`;
export default Completed;
