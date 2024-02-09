import {ImSpinner9} from 'react-icons/im';

export default function Loader(){
    return <div className="fixed top-0 right-0 left-0 bottom-0 bg-gray-50 bg-opacity-70 animate-pulse flex items-center justify-center rounded-[10px] overflow-hidden z-[9999999999]">
        <div className='animate-spin text-3xl'>
            <ImSpinner9/>
        </div>
    </div>
}