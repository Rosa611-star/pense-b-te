import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/axios';

function Login() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/notes');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="card card-body">
                    <div className="auth-header">
                        <div className="auth-logo">📝 NotePad</div>
                        <p className="auth-subtitle">Connectez-vous à votre espace</p>
                    </div>

                    {error && (
                        <div className="form-error" style={{ marginBottom: '12px', padding: '10px 13px',
                            background: 'var(--danger-bg)', borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(185,28,28,.2)' }}>
                            ⚠ {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email</label>
                            <input
                                id="login-email"
                                className="form-input"
                                type="email"
                                value={email}
                                autoComplete="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vous@exemple.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-pwd">Mot de passe</label>
                            <input
                                id="login-pwd"
                                className="form-input"
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', marginTop: '4px', padding: '12px' }}
                        >
                            {loading ? <span className="spinner" /> : null}
                            {loading ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Pas de compte ?{' '}
                        <Link to="/register">Créer un compte</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;