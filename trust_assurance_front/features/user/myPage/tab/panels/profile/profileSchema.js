import { z } from "zod"

export const profileFormSchema = z.object({
    name: z
        .string({
            required_error: "заавал оруул",
            invalid_type_error: "문자만 입력해주세요.",
        })
        .min(1, "한 글자 이상 입력해주세요."),
    address: z
        .string({
            required_error: "заавал оруул",
            invalid_type_error: "문자만 입력해주세요.",
        })
        .min(1, "한 글자 이상 입력해주세요."),
    phone: z
        .string({
            required_error: "заавал оруул",
            invalid_type_error: "문자만 입력해주세요.",
        })
        .min(1, "min is 8 numbers")
        .refine((value) => {
            const regex = /^[0-9]{3}-([0-9]{3}|[0-9]{4})-[0-9]{4}$/
            return regex.test(value)
        }, ' "-" 를 넣어 입력해주세요'),
})
