import parse from "html-react-parser";
import { storages } from "./libs";
import { getLocal } from "./storage";

export function convertString(text) {
  const string = JSON.stringify(text);
  return string;
}
export function renderParsedString(str) {
  if (typeof str === "string") {
    return parse(str);
  }
  return;
}

export function parseToken( token ) {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch(e) {
    return null
  }
}

export function isTokenEnded( token ) {
    if( !token ) return true
   
    const decodedToken = parseToken(token)
    
    if(decodedToken?.exp * 1000 < Date.now() ) return true
    
    return false
}

export function  subStr( string, maxLength = 10) {
    if(!string) {
      return ''
    }
    if( string?.length < maxLength ) {
      return string
    }
    
    const halfString = string?.substr(0, maxLength) + "...";
    return halfString
}

export function validStr(longString, string) {
    if(longString === '') return false
    const isValid = longString.includes(string)
    return isValid
}