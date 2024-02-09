import { z } from 'zod'

export const profileFormSchema = z.object({
    name: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг байх ёстой',
        })
        .min(1, 'доод тал нь 1 урттай үг байх ёстой'),
    address: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг байх ёстой',
        })
        .min(1, 'доод тал нь 2 урттай үг байх ёстой'),
    phone: z
        .string()
        .min(1, 'min is 8 numbers')
        .refine((value) => {
            const regex = /^[0-9]{3}-([0-9]{3}|[0-9]{4})-[0-9]{4}$/
            return regex.test(value)
        }, ' "-" 를 넣어 입력해주세요'),
    introduce: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг байх ёстой',
        })
        .min(1, 'доод тал нь 1 урттай өгүүлбэр байх ёстой'),
})
