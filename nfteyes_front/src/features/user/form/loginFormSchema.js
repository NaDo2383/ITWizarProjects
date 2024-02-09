import { z } from 'zod'

export const loginFormSchema = z.object({
    id: z
        .string({
            required_error: 'Please check your ID(Email)',
            invalid_type_error: 'Please check your ID(Email)',
        })
        .email({
            message: 'Please enter a valid email address for your ID',
        }),
    password: z.string({
        required_error: 'Please enter yout PW',
        invalid_type_error: 'Please enter yout PW',
    }),
})
