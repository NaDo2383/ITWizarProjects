import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CustomErrorFallback from './CustomErrorFallback'

function MainErrorBoundary({ children }) {
    return (
        <ErrorBoundary FallbackComponent={CustomErrorFallback}>{children}</ErrorBoundary>
    )
}

export default MainErrorBoundary
