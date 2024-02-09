import React, { useEffect } from 'react'
import { useFormCtx } from './useFormCtx'
import { TFormState } from './formReducer'
type TUseFormOptions = {
    initCase: any
}

function useForm<T>(data?: T, options?: TUseFormOptions) {
    const { formState, formDispatch } = useFormCtx()

    function createInitFormPayload(data: T): Partial<T> {
        if (data) {
            const fieldNames = Object.keys(data) as Array<keyof T>
            const partialFormState: Partial<T> = {}

            fieldNames.forEach((fieldName) => {
                partialFormState[fieldName] = data[fieldName]
            })

            return partialFormState
        }
        return {}
    }
    function onChange(e: React.ChangeEvent<HTMLFormElement>, isCheckbox?: boolean) {
        const { value, name } = e.target
        const theValue = isCheckbox ? e.target.checked.toString() : value.trim()

        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name as keyof TFormState, value: theValue },
        })
    }

    // event авахгүйгээр форм руу set хийх функц
    function onChangeWithoutEvent(name: string, value: string) {
        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name as keyof TFormState, value },
        })
    }

    function onChangeGroupCheckbox(groupName: string, fieldName: keyof TFormState, value: boolean) {
        formDispatch({
            type: 'CHECKBOX_GROUP_CHANGE',
            payload: {
                groupName,
                fieldName,
                value: value.toString(),
            },
        })
    }

    function onChangeFile(e: React.ChangeEvent<HTMLFormElement>) {
        const { files, name } = e.target
        console.log('file', e.target.files)
        formDispatch({
            type: 'CHANGE',
            payload: { fieldName: name as keyof TFormState, value: files[0] },
        })
    }

    function onChangeGroupList(e: React.ChangeEvent<HTMLFormElement>, idx: number, listName: string) {
        const { value, name: fieldName } = e.target
        formDispatch({
            type: 'UPDATE_LIST',
            payload: {
                listName,
                idx,
                fieldName,
                value,
            },
        })
    }

    function onError(errors: any) {
        if (errors === null) {
            return
        }
        formDispatch({
            type: 'SET_ERRORS',
            payload: errors,
        })
    }

    function resetFormField(fieldName: string) {
        formDispatch({
            type: 'RESET_FORM_FIELD',
            payload: { fieldName },
        })
    }

    // формын тухайн талбарын error - ийг set - лэнэ
    function setErrorField(fieldName: string, error: string) {
        formDispatch({
            type: 'SET_ERROR_FIELD',
            payload: { fieldName, error },
        })
    }

    // формын тухайн талбар луу value set - лэнэ
    function setValueField(fieldName: string, value: string) {
        formDispatch({
            type: 'SET_VALUE_FIELD',
            payload: { fieldName, value },
        })
    }

    function addListField<T>(fieldName: string, newListField: T) {
        formDispatch({
            type: 'ADD_LIST',
            payload: {
                fieldName,
                value: [...(formState[fieldName] as any), newListField],
            },
        })
    }

    function removeListField(indexToRemove: number, fieldName: string) {
        const updatedCreatorList = [...(formState[fieldName] as any)]
        updatedCreatorList.splice(indexToRemove, 1)
        formDispatch({
            type: 'MINUS_LIST',
            payload: {
                fieldName,
                value: updatedCreatorList,
            },
        })
    }

    function resetList(fieldName: string) {
        formDispatch({
            type: 'RESET_LIST',
            payload: {
                fieldName,
            },
        })
    }

    useEffect(() => {
        console.log('data', data)
        if (data) {
            const initFormState = createInitFormPayload(data)
            formDispatch({
                type: 'INIT_FORM_STATE',
                payload: initFormState as TFormState,
            })
        }
    }, [options?.initCase, data])

    return {
        onChange,
        onChangeFile,
        onChangeGroupCheckbox,
        onChangeWithoutEvent,
        onError,
        formState,
        resetFormField,
        setErrorField,
        setValueField,
        onChangeGroupList,
        addListField,
        removeListField,
        resetList,
    }
}

export default useForm
