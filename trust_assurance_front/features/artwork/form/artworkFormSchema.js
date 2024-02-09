import { z } from "zod"

export const artworkFormSchema = z.object({
    mediaName: z
        .string({
            required_error: "아이디가 없습니다.",
            invalid_type_error: "아이디가 없습니다.",
        })
        .min(1, "최소 1글자"),
    description: z
        .string({
            required_error: "비밀번호가 없습니다",
            invalid_type_error: "비밀번호가 없습니다",
        })
        .min(1, "최소 1글자"),
})
