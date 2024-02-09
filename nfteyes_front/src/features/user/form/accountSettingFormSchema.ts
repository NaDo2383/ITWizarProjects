import { z } from 'zod'

export const accountSettingFormSchema = z.object({
    oldPassword: z
        .string({
            required_error: 'Please enter your current password.',
            invalid_type_error: 'Please enter your current password.',
        })
        .min(2, 'min 2 character required'),
    newPassword: z
        .string({
            required_error: 'Please enter your new password.',
            invalid_type_error: 'Please enter your new password.',
        })
        .min(2, 'min 2 character required'),
    newPasswordConfirm: z
        .string({
            required_error: 'Please confirm your new password by entering it again.',
            invalid_type_error: 'Please confirm your new password by entering it again.',
        })
        .min(2, 'min 2 character required'),
})
