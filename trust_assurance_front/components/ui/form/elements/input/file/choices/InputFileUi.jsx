import React, { useEffect, useRef, useState } from 'react'
import InputFile from '../InputFile'
import styled from 'styled-components'
import MainErrorBoundary from '@/components/ui/error/MainErrorBoundary'
import { BsImageFill } from 'react-icons/bs'
import ArrowUpRightIcon from '@/components/ui/icon/ArrowUpRightIcon'

function InputFileUi(props) {
    const btnRef = useRef(null)
    const [btnWidth, setBtnWdith] = useState(0)
    useEffect(() => {
        if (btnRef.current) {
            setBtnWdith( props.width || btnRef.current?.offsetWidth)
        }
    }, [])
    return (
      <MainErrorBoundary>
        <FileWrapper style={{ width: `${btnWidth}px` }}>
            <HiddenDiv>
                <InputFile {...props} />
            </HiddenDiv>
            <FileBtn ref={btnRef}>
                { props.placeholder || '파일을 입력하세요' } 
                <ArrowUpRightIcon />
            </FileBtn>
        </FileWrapper>
      </MainErrorBoundary>  
    )
}

const FileWrapper = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 100;
`;

const HiddenDiv = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0;
`;

const FileBtn = styled.button`
  display:flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  background-color: #ddf247;
`;

export default InputFileUi
