import { useEffect } from 'react';
import { useState, useCallback } from 'react';
/**
 * Toast notification component.
 * @param {{ toasts: Array, removeToast: Function }} props
 */
function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="toast-container" role="region" aria-label="Notifications">
            {toasts.map(t => (
                <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
            ))}
        </div>
    );
}

function Toast({ toast, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, toast.duration ?? 3500);
        return () => clearTimeout(timer);
    }, [toast, onClose]);

    const icon = toast.type === 'success' ? '✓' : '✕';

    return (
        <div className={`toast toast-${toast.type ?? 'info'}`} role="alert">
            <span className="toast-icon">{icon}</span>
            <span className="toast-msg">{toast.message}</span>
            <button className="toast-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>
    );
}

/**
 * Custom hook to manage toasts.
 * Returns { toasts, toast } where toast(msg, type) creates a notification.
 */


export function useToast() {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 3500) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return { toasts, toast: addToast, removeToast };
}

export default ToastContainer;