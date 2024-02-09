import React from 'react'
import styled from 'styled-components'

function InputFile(props) {
    const { name, required, onChange, isValid, id } = props
    return (
        <InputFileStyled
            type="file"
            id={id}
            required={required}
            onChange={onChange}
            name={name}
            className={isValid ? 'border border-orange' : ''}
        />
    )
}

const InputFileStyled = styled.input`
  width: 100%;
  height:100%;
  border: none;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    box-shadow: none;
  }
`;

export default InputFile
