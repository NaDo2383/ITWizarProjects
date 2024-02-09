import { useGlobalPopupCtx } from '@/common/popup/useGlobalPopupCtx'
import Button from '@/components/ui/button/Button'
import { Flex } from '@/components/ui/containers/flex/Flex'
import InputText from '@/components/ui/form/elements/input/InputText'
import Select from '@/components/ui/form/elements/select/_choices/simpleSelect/Select'
import useForm from '@/components/ui/form/store/useForm'
import React from 'react'
import { useState } from 'react'
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopupRegistration'

function NewCertificationForm() {

  const [intitialFormState] = useState({
    name: { value: null, error: null },
    birthDate: { value: null, error: null },
    nationality: { value: null, error: null },
    gender: { value: null, error: null },
  })


  const nationality = [
    { label: 'Korea', value: 'kr' },
    { label: 'Usa', value: 'usa' },
    { label: 'China', value: 'china' },
    { label: 'Russia', value: 'russia' },
    { label: 'Mongolia', value: 'mongolia' },
  ]

  const gender = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ]

  const { onChange, formState } = useForm(intitialFormState)
  const { showGlobalPopup } = useGlobalPopupCtx()

  return (
    <form>
      <div className='table-item'>
        <InputText
          name={'name'}
          onChange={onChange}
          value={formState?.name?.value}
          isValid={Boolean(formState?.name?.error)}
          placeholder="이름"
        />
      </div>
      <div className='table-item'>
        <InputText
          name={'birthDate'}
          onChange={onChange}
          value={formState?.birthDate?.value}
          isValid={Boolean(formState?.birthDate?.error)}
          placeholder="생년월일"
        />
      </div>
      <div className='table-item'>
        <Flex width="100%" gap={10}>
          <Flex column width="100%">
            <label align="left">국가</label>
            <Select
              name="nationality"
              options={nationality}
              defaultValue={nationality[1].value}
              onChange={onChange}
            />
          </Flex>
          <Flex column width="100%">
            <label>성별</label>
            <Select
              name="gender"
              options={gender}
              defaultValue={gender[0].value}
              onChange={onChange}
            />
          </Flex>
        </Flex>
      </div>
      <div className='table-item'>
        <Button onClick={(e) => { e.preventDefault(), showGlobalPopup(GLOBAL_POPUP_TYPES.VERIFICATION_COMPLETE) }}>
          발급
        </Button>
      </div>
    </form>
  )
}

export default NewCertificationForm