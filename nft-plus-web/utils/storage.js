const JWT_TOKEN = 'jwt-token';

export function getLocal(storageName) {
    if(typeof window !== 'undefined') {
        const item = localStorage.getItem(storageName)
        const retVal =  item ? JSON.parse(item) : 'ийм local storage байхгүй!'
        return retVal;
    }
}

export function setLocal(storageName, item) {
  const parsedItem = JSON.stringify(item)
  typeof window !== 'undefined' && localStorage.setItem(storageName, parsedItem);
}

export function getToken() {
  return getCookie(JWT_TOKEN) 
}


export function getCookie(name) {
  const value = typeof window !== "undefined" && document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : undefined;
}

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
export function setSessionCookie(value) {
  document.cookie = `${JWT_TOKEN}=${value};path=/`;
}

export function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const cookieNames = {
  JWT_TOKEN
}