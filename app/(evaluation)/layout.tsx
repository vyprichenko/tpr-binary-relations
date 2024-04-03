'use client';

import AppStepper from '@/components/AppStepper';

export default function EvaluationLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppStepper />
            <main>{children}</main>
        </>
    );
}
