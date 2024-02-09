import { z } from 'zod'

export const exampleFormSchema = z.object({
    username: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг орох',
        })
        .min(2, 'доод тал нь 2 үсэг'),
    phone: z
        .number({
            invalid_type_error: 'заавал оруул',
        })
        .min(3, 'доод тал нь 3 тоо'),
    email: z
        .string({
            invalid_type_error: 'заавал оруул',
        })
        .email('Invalid email format'),
    date: z.date({
        required_error: 'Please select a date and time',
        invalid_type_error: 'thats not date',
    }),
    radioButton: z.string(),
    selectBox: z.string(),
    checkbox: z.boolean(),
    checkboxGroup: z.string().array().optional(),
})
