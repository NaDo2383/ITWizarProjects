import { z } from 'zod'

export const recoverPasswordFormSchema = z.object({
    password: z
        .string({})
        .min(8, 'доод тал нь 8 үсэг')
        .max(16, 'их тал нь 16 үсэг')
        .refine((value) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_,.:;+=-])[A-Za-z\d@$!%*?&#^_,.:;+=-]{8,16}$/
            return regex.test(value)
        }, 'Please create a password with a minimum of 8 characters, including English letters, numbers, and special characters.'),
})
