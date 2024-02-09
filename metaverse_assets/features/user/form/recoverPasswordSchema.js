import { z } from 'zod'

export const recoverPasswordFormSchema = z.object({
    password: z
        .string({
            required_error: 'заавал оруул',
            invalid_type_error: 'заавал үсэг орох',
        })
        .min(8, 'доод тал нь 8 үсэг')
        .max(16, 'их тал нь 16 үсэг')
        .refine((value) => {
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_,.:;+=-])[A-Za-z\d@$!%*?&#^_,.:;+=-]{8,16}$/
            return regex.test(value)
        }, '비밀번호는 영문 대 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요.'),
})