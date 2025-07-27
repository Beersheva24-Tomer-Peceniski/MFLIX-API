import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/ApiClient';
import { useUserData } from '../state-management/user';

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
  const setToken = useUserData(state => state.setToken);

  async function login() {
    setLoading(true);
    setError(initialError);
    try {
      const response = await apiClient.login({ email, password });
      const token = response.data.token;

      // Token returned → store it using zustand and navigate
      setToken(token);
      navigate('/');
    } catch (err: any) {
      let newError: LoginError = { ...initialError };

      // Backend error response
      const serverError = err.response?.data?.error;
      if (serverError) {
        if (serverError.email) newError.emailError = serverError.email;
        if (serverError.password) newError.passwordError = serverError.password;
        if (!serverError.email && !serverError.password) {
          newError.general = typeof serverError === 'string'
            ? serverError
            : JSON.stringify(serverError);
        }
      } else {
        // Network error or unexpected
        newError.general = err.message || 'Something went wrong';
      }

      setError(newError);
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
