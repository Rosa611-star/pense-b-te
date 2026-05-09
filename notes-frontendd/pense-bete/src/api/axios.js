import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// ── Request interceptor: inject Bearer token ──────────────
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Response interceptor: handle 401 → logout ────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Redirect to login without React Router (safe from any context)
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Extract a human-readable error message from an Axios error.
 * Handles Laravel 422 validation bags, 403, 404, 500 and network errors.
 */
export function getErrorMessage(err) {
    const status = err.response?.status;
    const data   = err.response?.data;

    if (!status) return 'Erreur réseau. Vérifiez votre connexion.';

    if (status === 422 && data?.errors) {
        // Return the first validation message
        const firstField = Object.values(data.errors)[0];
        return Array.isArray(firstField) ? firstField[0] : firstField;
    }
    if (data?.message) return data.message;
    if (status === 403) return 'Action non autorisée.';
    if (status === 404) return 'Ressource introuvable.';
    if (status === 500) return 'Erreur serveur. Réessayez plus tard.';

    return `Erreur ${status}.`;
}

export default api;