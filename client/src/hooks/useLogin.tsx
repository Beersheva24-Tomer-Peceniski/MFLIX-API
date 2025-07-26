import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface LoginError {
  emailError: string | null;
  passwordError: string | null;
  general: string | null;
}

const initialError: LoginError = {
  emailError: null,
  passwordError: null,
  general: null,
};

function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<LoginError>(initialError);
    const navigate = useNavigate();

    async function login() {
        setLoading(true);
        setError(initialError);
        try {
            const response = await fetch('api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                let newError: LoginError = { ...initialError };
                if (result && result.error) {
                    if (result.error.email) newError.emailError = result.error.email;
                    if (result.error.password) newError.passwordError = result.error.password;
                    if (!result.error.email && !result.error.password) {
                        newError.general = typeof result.error === 'string' ? result.error : JSON.stringify(result.error);
                    }
                } else {
                    newError.general = result.message || 'Something went wrong';
                }
                setError(newError);
                return;
            }

            // Success
            localStorage.setItem("token", result.token);
            navigate('/');
        } catch (err: any) {
            setError({ ...initialError, general: err.message || 'Something went wrong' });
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        login,
    };
}

export default useLogin;
