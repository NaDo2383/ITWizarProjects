import React, { FC, Dispatch, useReducer, useContext, createContext } from 'react'
import { TFormState, TFormAction, formReducer } from './formReducer'

interface IFormCtx {
    formState: TFormState
    formDispatch: Dispatch<TFormAction>
}

const FormContext = createContext<IFormCtx>({} as IFormCtx)

interface IFormProvider extends JsxChildren {}

const FormProvider: FC<IFormProvider> = ({ children }) => {
    const [formState, formDispatch] = useReducer(formReducer, {})

    return (
        <FormContext.Provider
            value={{
                formState,
                formDispatch,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}

const useFormCtx = (): IFormCtx => {
    const context = useContext(FormContext)
    if (!context) throw new Error('useFormCtx must be used within a FormProvider')
    return context
}

export { FormContext, FormProvider, useFormCtx }
