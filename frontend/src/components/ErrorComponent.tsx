import React from 'react';
import '../styles/ErrorComponent.css';

interface ErrorMessage {
    property: string;
    message: string;
}

interface ErrorComponentProps {
    errorMessages: ErrorMessage[];
    onClose: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessages, onClose }) => {
    return (
        <div className="error-modal">
            <h2>Error</h2>
            <ul>
                {errorMessages.map((error, index) => (
                    <li key={index}>{`${error.message}.`}</li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ErrorComponent;