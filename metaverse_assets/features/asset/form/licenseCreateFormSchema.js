import { z } from 'zod'

export const licenseCreateFormSchema = z.object({
    userName: z.string({
        required_error: '에셋 이름 없습니다.',
        invalid_type_error: '에셋 이름 없습니다.',
    }),
    userID: z.string({
        required_error: '에셋에 대한 설명을 입력해주세가 없습니다',
        invalid_type_error: '에셋에 대한 설명을 입력해주세가 없습니다',
    }),
    lriif: z.string({
        required_error: '에셋에 대한 설명을 입력해주세가 없습니다',
        invalid_type_error: '에셋에 대한 설명을 입력해주세가 없습니다',
    }),
})
