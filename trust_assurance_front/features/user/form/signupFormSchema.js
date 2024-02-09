import { z } from "zod"

export const signupFormSchema = z.object({
    membershipType: z.string(),
    id: z.string({
        required_error: "заавал оруул",
        invalid_type_error: "заавал үсэг орох",
    }),
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
        }, "비밀번호는 영문 대 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요."),
    name: z.string({
        required_error: "заавал оруул",
        invalid_type_error: "заавал үсэг орох",
    }),
    email: z
        .string({
            invalid_type_error: "заавал оруул",
        })
        .email("이메일이 아니다"),
    verifyNumber: z.string({
        required_error: "заавал оруул",
        invalid_type_error: "заавал үсэг орох",
    }),
})
