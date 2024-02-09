import { z } from 'zod'

export const signupFormSchema = z.object({
    username: z.string({
        required_error: 'input empty',
        //invalid_type_error: 'заавал үсэг орох',
    }),
    password: z
        .string({
            required_error: 'input empty',
            //invalid_type_error: 'заавал үсэг орох',
        })
        .min(8, 'доод тал нь 8 үсэг')
        .max(16, 'их тал нь 16 үсэг')
        .refine((value) => {
            // Use regex pattern to validate the password
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_,.:;+=-])[A-Za-z\d@$!%*?&#^_,.:;+=-]{8,16}$/
            return regex.test(value)
        }, 'Please create a password with a minimum of 8 characters, including English letters, numbers, and special characters.'),
})
