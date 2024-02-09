import { z } from "zod"

export const changePasswordFormSchema = z.object({
    password: z
        .string({
            required_error: "заавал оруул",
            invalid_type_error: "заавал үсэг орох",
        })
        .min(8, "доод тал нь 8 үсэг")
        .max(16, "최대 16자만 입력 가능합니다.")
        .refine((value) => {
            // Use regex pattern to validate the password
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_,.:;+=-])[A-Za-z\d@$!%*?&#^_,.:;+=-]{8,16}$/
            return regex.test(value)
        }, " 8~16자 / 대·소문자, 숫자, 특수문자 조합"),
})
