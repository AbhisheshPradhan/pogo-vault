import React, { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { QueryErrorState } from './query-error-state';
import { PageLoadingSpinner } from './page-loading-spinner';

interface QueryBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    errorTitle?: string;
    errorMessage?: string;
}

export const QueryBoundary: React.FC<QueryBoundaryProps> = ({
    children,
    fallback = <PageLoadingSpinner />,
    errorTitle,
    errorMessage,
}) => {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            FallbackComponent={(props) => (
                <QueryErrorState
                    {...props}
                    title={errorTitle}
                    message={errorMessage}
                />
            )}
        >
            <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
    );
};
