import React, { useEffect, useState } from 'react'
import Select from 'components/ui/form/elements/select/_choices/Select'
import InputText from 'components/ui/form/elements/input/InputText'
import InputNumber from 'components/ui/form/elements/input/InputNumber'
import InputDate from 'components/ui/form/elements/input/InputDate'
import InputEmail from 'components/ui/form/elements/input/InputEmail'
import TextArea from 'components/ui/form/elements/textArea/TextArea'
import Checkbox from 'components/ui/form/elements/checkbox/Checkbox'
import Radio, { IRadioItem } from 'components/ui/form/elements/radio/Radio'
import useForm from '../store/useForm'
import { Button } from '../../button/Button'
import CheckboxGroup from '../elements/checkbox/CheckboxGroup'
import useCheckbox, { useCheckboxGroup } from '../elements/checkbox/useCheckbox'
import { TFormFileValue, TFormValue } from '../store/formReducer'
import FormRow from '../FormRow'
import { validateForm } from 'common/validation/validate'
import { exampleFormSchema } from './exampleSchema'
import InputFileUi from '../elements/input/file/choices/InputFileUi'
import ImageViewer from 'common/file/ImageViewer'
import Select1 from '../elements/select/_choices/select1/Select1'
import { PlussBtn, MinusBtn } from 'components/ui/button/PlussBtn'
import SelectContires from '../elements/select/_choices/select-lib/SelectContires'

const radioOptions: IRadioItem[] = [
    { label: 'radio1', value: 'utga1' },
    { label: 'radio2', value: 'utga2' },
    { label: 'radio3', value: 'utga3' },
]

const selectOptions = [
    { label: 'select1', value: 'utga1' },
    { label: 'select2', value: 'utga2' },
    { label: 'select3', value: 'utga3' },
]

export const checkboxGroupItems = [
    {
        name: 'Capsicum',
        price: 1.2,
        checked: true,
    },
    {
        name: 'Paneer',
        price: 2.0,
        checked: false,
    },
    {
        name: 'Red Paprika',
        price: 2.5,
        checked: false,
    },
    {
        name: 'Onions',
        price: 3.0,
        checked: true,
    },
    {
        name: 'Extra Cheese',
        price: 3.5,
        checked: true,
    },
    {
        name: 'Baby Corns',
        price: 3.0,
        checked: false,
    },
    {
        name: 'Mushroom',
        price: 2.0,
        checked: false,
    },
]

type TCreatorItem = {
    creatorName: TFormValue
    creatorId: TFormValue
}

type TExampleFormState = {
    username: TFormValue
    phone: TFormValue
    email: TFormValue
    date: TFormValue
    radioButton: TFormValue
    selectBox: TFormValue
    checkbox: TFormValue
    checkboxGroup: any
    creatorList: TCreatorItem[]
}

type TExampleFormFileState = {
    fileInput: TFormFileValue
}

function ExampleForm() {
    const { transformedCheckboxGroup } = useCheckboxGroup(checkboxGroupItems)
    const [initialFormState, setInitialFormState] = useState<any>(null)
    useEffect(() => {
        if (transformedCheckboxGroup) {
            console.log('transformedCheckboxGroup', transformedCheckboxGroup)
            const initialExampleFormState: TExampleFormState & TExampleFormFileState = {
                username: { value: null, error: null },
                phone: { value: null, error: null },
                email: { value: null, error: null },
                date: { value: null, error: null },
                radioButton: { value: null, error: null },
                selectBox: { value: null, error: null },
                checkbox: { value: null, error: null },
                checkboxGroup: transformedCheckboxGroup,
                fileInput: { value: null, error: null },
                creatorList: [
                    {
                        creatorName: { value: null, error: null },
                        creatorId: { value: null, error: null },
                    },
                ],
            }
            setInitialFormState(initialExampleFormState)
        }
    }, [])

    const {
        onChange,
        onChangeWithoutEvent,
        onChangeFile,
        onChangeGroupList,
        formState,
        onError,
        addListField,
        removeListField,
    } = useForm<TExampleFormState>(initialFormState)
    const { getCheckedList } = useCheckbox()

    function onImageDrop(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]

        console.log('on dropped image: ', file)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const stateData = {
            ...formState,
            phone: {
                value: Number(formState.phone.value),
                error: null,
            },
            date: {
                value: new Date(formState.date.value!),
                error: null,
            },
        }
        console.log('sssssss', stateData)
        const { success, errors } = await validateForm(exampleFormSchema, stateData)
        if (success) {
            console.log(`awsan utguud: `, formState)
        } else {
            onError(errors)
            console.error('validation амжилтгүй', errors)
        }
    }
    // console.log('formState', formState)

    function handleAddCreator(e: React.FormEvent) {
        e.preventDefault()
        const newCreator = {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        }
        addListField<TCreatorItem>('creatorList', newCreator)
    }

    function handleRemoveCreator(e: React.FormEvent, idx: number) {
        e.preventDefault()
        removeListField(idx, 'creatorList')
    }

    useEffect(() => {
        if (formState?.checkboxGroup) {
            const checkedItems = getCheckedList(formState?.checkboxGroup)
            console.log('checkedItems', checkedItems)
        }
    }, [formState])
    console.log('formState===>', formState)

    return (
        <>
            <form className="flex flex-col gap-10 w-full p-10 border rounded-md">
                <FormRow errMsg={formState?.username?.error!}>
                    <InputText
                        name={'username'}
                        onChange={onChange}
                        value={formState?.username?.value!}
                        isValid={Boolean(formState?.username?.error)}
                        placeholder="text"
                    />
                </FormRow>
                <FormRow errMsg={formState?.phone?.error!}>
                    <InputNumber
                        name={'phone'}
                        value={formState?.phone?.value!}
                        isValid={Boolean(formState?.phone?.error)}
                        onChange={onChange}
                        placeholder="number"
                    />
                </FormRow>
                <FormRow errMsg={formState?.email?.error!}>
                    <InputEmail
                        name={'email'}
                        onChange={onChange}
                        value={formState?.email?.value!}
                        isValid={Boolean(formState?.email?.error)}
                        placeholder="email"
                    />
                </FormRow>
                <FormRow errMsg={formState?.date?.error!}>
                    <InputDate name={'date'} isValid={true} onChange={onChange} placeholder="date" />
                </FormRow>
                <FormRow errMsg={formState?.radioButton?.error!}>
                    <Radio
                        name="radioButton"
                        options={radioOptions}
                        onChange={onChange}
                        defaultValue={radioOptions[2].value}
                    />
                </FormRow>
                <FormRow errMsg={formState?.selectBox?.error!}>
                    <Select
                        name="selectBox"
                        options={selectOptions}
                        defaultValue={selectOptions[1].value}
                        onChange={onChange}
                    />
                </FormRow>
                <FormRow errMsg={formState?.selectBox?.error!}>
                    <Select1
                        name="selectBox1"
                        options={selectOptions}
                        defaultValue={selectOptions[1].label}
                        onChangeWithoutEvent={onChangeWithoutEvent}
                    />
                </FormRow>
                <FormRow>
                    <SelectContires onChange={(value) => console.log(value)} />
                </FormRow>
                <FormRow errMsg={formState?.checkbox?.error!}>
                    <Checkbox
                        name="checkbox"
                        onChange={onChange}
                        label="checkbox-label"
                        checked={Boolean(formState?.checkbox?.value!)}
                    />
                </FormRow>
                <FormRow errMsg={formState?.textAreaField?.error!}>
                    <TextArea name="textAreaField" cols={15} onChange={onChange} placeholder="write text" />
                </FormRow>
                <FormRow errMsg={formState?.checkboxGroup?.error!}>
                    <h3>Checkbox group: </h3>
                    {
                        <CheckboxGroup groupName="checkboxGroup">
                            {checkboxGroupItems.map((item, idx) => (
                                <Checkbox
                                    key={'check-group-' + idx}
                                    name={item.name}
                                    label={item.name}
                                    checked={item.checked || Boolean(formState?.[item.name]?.value!)}
                                />
                            ))}
                        </CheckboxGroup>
                    }
                </FormRow>
                <FormRow>
                    <h3>Multiple items:</h3>
                    <div className="flex flex-col gap-10">
                        {formState.creatorList?.map((creator: TCreatorItem, idx: number) => (
                            <div key={'creator-field' + idx} className="flex gap-10">
                                {idx === 0 ? (
                                    <PlussBtn onClick={handleAddCreator} />
                                ) : (
                                    <MinusBtn onClick={(e) => handleRemoveCreator(e, idx)} />
                                )}
                                <InputText
                                    name="creatorName"
                                    value={formState.creatorList[idx]?.creatorName?.value}
                                    placeholder="creator name"
                                    onChange={(e) => onChangeGroupList(e, idx, 'creatorList')}
                                />
                            </div>
                        ))}
                    </div>
                </FormRow>
                <FormRow>
                    <h3>file: </h3>
                    <label htmlFor="fileInput" onDrop={onImageDrop}>
                        <InputFileUi id="fileInput" name="fileInput" onChange={onChangeFile} />
                        <ImageViewer
                            file={formState?.fileInput?.value! || (null as any)}
                            width={250}
                            onDrop={onImageDrop}
                        />
                    </label>
                </FormRow>
                <Button onClick={handleSubmit}>Click me!</Button>
            </form>
        </>
    )
}

export default ExampleForm
