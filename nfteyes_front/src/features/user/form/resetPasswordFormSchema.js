import { z } from 'zod'

export const resetPasswordFormSchema = z.object({
    id: z
        .string({
            required_error: '아이디가 없습니다.',
            invalid_type_error: '아이디가 없습니다.',
        })
        .min(2, '최소 2글자'),
})
