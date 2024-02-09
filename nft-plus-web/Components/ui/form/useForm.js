/**
 * @createdBy Phill Anderson 2022/07/01
 */
import { useFormContext } from './useFormContext';

function useForm() {
    const { form, setForm } = useFormContext()
  
    function handleChangeForm(val, name) {
        setForm(prev => 
            ({
                ...prev, 
                [name]: { ...prev[name], 
                value: val } 
            }));
    };

    return {
        handleChangeForm,
        form
  }
}

export default useForm