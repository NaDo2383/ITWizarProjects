import { ZodSchema } from 'zod'

type TValidate = {
    success: boolean
    errors: Record<string, string> | null
}

export async function validateForm(zodSchema: ZodSchema<unknown>, formState: any): Promise<TValidate> {
    try {
        const theFormState: any = {}
        Object.keys(formState).forEach((fieldName) => (theFormState[fieldName] = formState[fieldName]?.value || null))
        await zodSchema.parse(theFormState)
        return { success: true, errors: null }
    } catch (validationErrors) {
        const newErrors: Record<string, string> = {}
        ;(validationErrors as any).errors.forEach((err: any) => {
            newErrors[err.path[0]] = err.message
        })
        console.error('form validation Error:', newErrors)
        return { success: false, errors: newErrors }
    }
}
