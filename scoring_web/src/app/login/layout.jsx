"use client"
import React from "react"
import FixedPlugin from "../components/fixedPlugin/FixedPlugin"
import { FormProvider } from "../common/form/useFormCtx"

export default function loginlayout({ children }) {
    return (
        <div>
            <div className='relative float-right h-full min-h-screen w-full dark:!bg-navy-900'>
                <main className={`mx-auto min-h-screen`}>
                    <FixedPlugin />
                    <FormProvider>
                        {children}
                    </FormProvider>
                </main>
            </div>
        </div>
    )
}
