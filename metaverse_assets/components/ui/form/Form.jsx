import React from 'react'
import { FormProvider } from './store/useFormCtx'

function Form({ children }) {
    return <FormProvider>{children}</FormProvider>
}

export default Form
