import { z } from "zod"

const nullToZero = (val) => (val === null ? 0 : val)

const CustomNumber = z.any().transform(nullToZero)

export const formulaDataSchema = z.object({
    value: z.string({
        required_error: "Утга заавал оруул",
        invalid_type_error: "Утга заавал үсэг байх ёстой",
    }),
    point: z.number({
        required_error: "Оноо заавал оруул",
        invalid_type_error: "Оноо заавал тоо байх ёстой",
    }),
    beginValue: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Эхлэх утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["beginValue"],
        }
    ),
    endValue: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["endValue"],
        }
    ),
})
