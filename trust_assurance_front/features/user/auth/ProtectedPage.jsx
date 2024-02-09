import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import { getAuthToken, isTokenEnded } from '@/common/token/token'
import useToken from '@/common/token/useToken'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'

function ProtectedPage({ children }) {
  const { push } = useRouter()
  const { authState } = useGlobalCtx()
  const { getAuthToken } = useToken();


  useEffect(() => {
    getAuthToken().then((res) => {
      if (!res) {
        push('/')
      }
    });
  }, [])

  // if (isTokenEnd) {
  //   push('/')
  //   return null
  // }

  useEffect(() => {
    if (!authState) {
      push('/')
    }
  }, [authState])

  return (
    <>{children}</>
  )
}

export default ProtectedPage