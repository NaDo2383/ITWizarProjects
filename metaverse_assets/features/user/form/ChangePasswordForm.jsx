import React from 'react'
import FormRow from 'a/components/ui/form/FormRow'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import tw from 'tailwind-styled-components'
import InputPassword from 'a/components/ui/form/elements/input/InputPassword'
import Form from 'a/components/ui/form/Form'
import Button from 'a/components/ui/button/Button'
import { Label } from 'a/components/ui/typography/Label'
//import useForm from 'a/components/ui/form/store/useForm'
import { FormMainTitle } from 'a/features/asset/form/LicenseCreateForm'

function ChangePasswordForm() {
    return (
        <ChangePasswordContainer>
            <div>
                <FormMainTitle className="text-center">비밀번호 재설정</FormMainTitle>
            </div>
            <div className="sm:p-10 p-4">
                <h4 className="mb-4">
                    현재 사용하고 계신 비밀번호를 먼저 입력하신 후, <br />
                    아래에 변경할 새 비밀번호를 입력하세요
                </h4>
                <Form>
                    <FormRow>
                        <Label className="mb-2">기존 비밀번호</Label>
                        <Flex>
                            <InputPassword
                                name={'oldPassword'}
                                placeholder="기존 비밀번호"
                            />
                        </Flex>
                    </FormRow>
                    <FormRow>
                        <Label>
                            새 비밀번호
                            <Flex className="flex justify-end">
                                <SpanWarning>
                                    * 8~16자 / 대·소문자, 숫자, 특수문자 조합
                                </SpanWarning>
                            </Flex>
                        </Label>
                        <Flex>
                            <InputPassword
                                name={'newPassword'}
                                placeholder="새 비밀번호"
                            />
                        </Flex>
                    </FormRow>
                    <FormRow>
                        <Label className="mb-2">새 비밀번호 확인</Label>
                        <Flex>
                            <InputPassword
                                name={'newPassword-repeat'}
                                placeholder="새 비밀번호 확인"
                            />
                        </Flex>
                    </FormRow>
                    <Button className="rounded">비밀번호 변경하기</Button>
                </Form>
            </div>
        </ChangePasswordContainer>
    )
}

const ChangePasswordContainer = tw.div`
    w-full
    sm:container
    sm:mx-auto
    sm:text-[16px]
    text-sm
`
const SpanWarning = tw.div`
    text-blue
    sm:text-sm
    text-xs
`

export default ChangePasswordForm
