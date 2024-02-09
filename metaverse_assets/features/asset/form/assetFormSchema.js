import { z } from 'zod'

export const assetFormSchema = z.object({
    assetName: z.string({
        required_error: '에셋 이름 없습니다.',
        invalid_type_error: '에셋 이름 없습니다.',
    }),
    // assetURL: z
    //     .string({
    //         required_error: '에셋 URL 없습니다.',
    //         invalid_type_error: '에셋 URL 없습니다.',
    //     })
    //     .min(6, '최소 6글자'),
    description: z.string({
        required_error: '에셋에 대한 설명을 입력해주세가 없습니다',
        invalid_type_error: '에셋에 대한 설명을 입력해주세가 없습니다',
    }),
    tags: z.string().refine(
        (data) => {
            if (typeof data === 'string') {
                const values = data.split(',').map((value) => value.trim())
                return values.every((value) => typeof value === 'string')
            }
            return false
        },
        {
            message: 'Field must be a string with comma-separated values',
        }
    ),
})
