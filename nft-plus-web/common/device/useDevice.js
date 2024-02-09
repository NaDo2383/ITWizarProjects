/**
 * @createdBy Phill Anderson 2022/08/08
 */
function useDevice() {

    function detectDevice() {
        let isMobile = window.matchMedia || window.msMatchMedia;
        if (isMobile) {
          let match_mobile = isMobile("(pointer:coarse)");
          return match_mobile.matches;
        }
        return false;  
    }

    function detectAndroidOrIOS(){
        const userAgent = navigator.userAgent || navigator.vender ||  window.opera;
        if( /Android/i.test(userAgent)) {
            return 'android'
        } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
           return 'ios'
        } else {
            return 'other'
        }
    }

    return {
        detectDevice,
        detectAndroidOrIOS
    }
}

export default useDevice;