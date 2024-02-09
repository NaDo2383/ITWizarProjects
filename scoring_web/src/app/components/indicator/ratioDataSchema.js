import { z } from "zod"

const nullToZero = (val) => (val === null ? 0 : val)

const CustomNumber = z.any().transform(nullToZero)

export const ratioDataSchema = z.object({
    collateralLoanPaymentRatio: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["endValue"],
        }
    ),
    currIncomeLoanPaymentRatio: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["endValue"],
        }
    ),
    ownIncomeLoanPaymentRatio: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["endValue"],
        }
    ),
    debtIncomeRatio: CustomNumber.refine(
        (val) => val !== undefined && val !== null && val >= 0,
        {
            message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
            path: ["endValue"],
        }
    ),
    score: CustomNumber.refine((val) => val !== undefined && val !== null && val >= 0, {
        message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
        path: ["endValue"],
    }),
    month: CustomNumber.refine((val) => val !== undefined && val !== null && val >= 0, {
        message: "Дуусах утга 0-с их буюу тэнцүү тоо байх ёстой",
        path: ["endValue"],
    }),
})
