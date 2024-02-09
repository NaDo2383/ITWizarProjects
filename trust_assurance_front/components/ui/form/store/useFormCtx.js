import React, { useReducer, useContext, createContext, useState } from "react"
import { formReducer } from "./formReducer"

const FormContext = createContext({})

const FormProvider = ({ children }) => {
    const [formState, formDispatch] = useReducer(formReducer, {})
    const [isUploading, setIsUploading] = useState(false)

    return (
        <FormContext.Provider
            value={{
                formState,
                formDispatch,
                isUploading,
                setIsUploading,
            }}>
            {children}
        </FormContext.Provider>
    )
}

const useFormCtx = () => {
    const context = useContext(FormContext)
    if (!context) throw new Error("useFormCtx must be used within a FormProvider")
    return context
}

export { FormContext, FormProvider, useFormCtx }
