import { z } from 'zod'

export const analyzeFormSchema = z.object({
    username: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг байх ёстой',
        })
        .min(2, 'доод тал нь 2 урттай үг байх ёстой'),
    email: z.string().email('Invalid email format'),
    address: z.string(),
    phone: z.string().min(1, 'phone required'),
    website: z.string(),
    company: z.string(),
})
