import React, { ReactNode } from 'react';
import '../styles/LoaderComponent.css';

export default function InputWithErrorComponent({ name, children, errorMessages }: { name: string, children: ReactNode, errorMessages: any }) {

    const getErrorMessageForInput = () => {
        const error = errorMessages.find((p: { property: string; }) => p.property == name)
        if (error) {
            return error.message
        }
        return null;
    }

    const showErrorMessages = () => errorMessages != null;

    return (
        <div>
            {children}
            {showErrorMessages() && <p style={{ color: 'red' }}>{getErrorMessageForInput()}</p>}
        </div>
    );
};