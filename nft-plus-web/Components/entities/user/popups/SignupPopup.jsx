import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import React, { useEffect} from 'react'
import warning from "public/icone.svg";
import useCommonTranslation from 'locale/useCommonTranslation';
import Image from 'next/image';
import closeIcon from 'public/close.svg';

function SignupPopup() {
    const { hideModal, getCurrentModalprops , popupProps} = usePopup()
    const { closeI18 } = useCommonTranslation()
    
    useEffect(() => {
        getCurrentModalprops()
    },[])

  return (
    <MainPopup>
        <div className='bg-white w-[450px] rounded-xl pt-4 flex flex-col justify-center'>
            <button onClick={ () => hideModal() }>
                <Image src={closeIcon} alt="close"/>
            </button>
            <div className="relative"><Image src={warning} alt="warning" /></div>
            <h2 className={`text-base tracking-[-1px] text-center mx-[50x] mt-[30px] my-4`}>
                {popupProps || 'this is signup error message'}
            </h2>
            <button onClick={() => hideModal()} className="w-1/2 bg-[#333] rounded-md text-white py-4 cursor-pointer text-center">
                {closeI18}
            </button>
        </div>

    </MainPopup>
  )
}

export default SignupPopup