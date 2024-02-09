import React from 'react'
import { FormProvider } from './store/useFormCtx'

function Form({ children }: JsxChildren) {
    return <FormProvider>{children}</FormProvider>
}

export default Form
