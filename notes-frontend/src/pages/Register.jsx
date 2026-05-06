import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/axios';

function Register() {
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/register', { name, email, password });
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
                        <p className="auth-subtitle">Créez votre compte gratuitement</p>
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
                            <label className="form-label" htmlFor="reg-name">Nom complet</label>
                            <input
                                id="reg-name"
                                className="form-input"
                                type="text"
                                value={name}
                                autoComplete="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jean Dupont"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-email">Email</label>
                            <input
                                id="reg-email"
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
                            <label className="form-label" htmlFor="reg-pwd">
                                Mot de passe
                                <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}> (min. 6 car.)</span>
                            </label>
                            <input
                                id="reg-pwd"
                                className="form-input"
                                type="password"
                                value={password}
                                autoComplete="new-password"
                                required
                                minLength={6}
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
                            {loading ? 'Création…' : 'Créer mon compte'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Déjà un compte ?{' '}
                        <Link to="/login">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;