import { z } from 'zod'

export const loginFormSchema = z.object({
    id: z
        .string({
            required_error: '아이디가 없습니다.',
            invalid_type_error: '아이디가 없습니다.',
        })
        .min(2, '최소 2글자')
        .refine((value) => {
            const regex = /^[a-zA-Z0-9]+$/;
            return regex.test(value);
          }, '아이디를 입력해주세요.'),
    password: z
        .string({
            required_error: '비밀번호가 없습니다',
            invalid_type_error: '비밀번호가 없습니다',
        })
        .min(2, '최소 2글자'),
})
