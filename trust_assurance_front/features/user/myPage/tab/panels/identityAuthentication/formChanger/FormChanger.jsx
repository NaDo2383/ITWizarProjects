import React, { useEffect } from 'react'
import RadioGroup from '@/components/ui/form/elements/radio/RadioGroup'
import useForm from '@/components/ui/form/store/useForm'
import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import { useState } from 'react'

const radioItems = [
    { label: '기존 인증', value: 'existing Certification' },
    { label: '신규 인증', value: 'new Certification' },
]
function FormChanger() {
 
    const { setMyPageState } = useGlobalCtx()
    const [initialFormChangerState] = useState({
        formType: { value: radioItems[0]?.value, error: null },
    })
    
    const { onChange, formState } = useForm(initialFormChangerState, { initOnce: true })
    
    useEffect(() => {
        setMyPageState(prev => ({
            ...prev, 
            identityRadioValue: formState.formType
        }))
       
    },[formState])

  return (
    <form>
        <RadioGroup
            name='formType'
            options={radioItems}
            onChange={onChange}
            defaultValue={radioItems[0]?.value}
        />
    </form>  
  )
}

export default FormChanger