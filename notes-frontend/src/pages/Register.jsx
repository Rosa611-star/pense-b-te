import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Register() {
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/register', { name, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/notes');
        } catch (err) {
            setError("Erreur lors de l'inscription");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Inscription</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </div>
    );
}

export default Register;