import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/ApiClient';
import { useUserData } from '../state-management/user';

export interface LoginError {
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  nameError: string | null;
  general: string | null;
}

const initialError: LoginError = {
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
  nameError: null,
  general: null,
};

function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError>(initialError);
  const navigate = useNavigate();
  const setToken = useUserData(state => state.setToken);
  const setUserEmail = useUserData(state => state.setEmail);
  const setUserName = useUserData(state => state.setName);
  const setUserRole = useUserData(state => state.setRole);

  async function login() {
    setLoading(true);
    setError(initialError);
    try {
      const response = await apiClient.login({ email, password });
      const { token, user } = response.data;

      // Store token and user data using zustand and navigate
      setToken(token);
      setUserEmail(user.email);
      setUserName(user.name);
      setUserRole(user.role);
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

  async function signup() {
    setLoading(true);
    setError(initialError);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError({
        ...initialError,
        confirmPasswordError: 'Passwords do not match'
      });
      setLoading(false);
      return;
    }

    try {
      await apiClient.signup({ email, password, name});
      const response = await apiClient.login({ email, password });
      const { token, user } = response.data;
      // Store token and user data using zustand and navigate
      setToken(token);
      setUserEmail(user.email);
      setUserName(user.name);
      setUserRole(user.role);
      navigate('/');
    } catch (err: any) {
      let newError: LoginError = { ...initialError };

      // Backend error response
      const serverError = err.response?.data?.error;
      if (serverError) {
        if (serverError.email) newError.emailError = serverError.email;
        if (serverError.password) newError.passwordError = serverError.password;
        if (serverError.name) newError.nameError = serverError.name;
        if (!serverError.email && !serverError.password && !serverError.name) {
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

  function switchToSignUp() {
    setIsSignUp(true);
    setError(initialError);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  function switchToLogin() {
    setIsSignUp(false);
    setError(initialError);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    isSignUp,
    loading,
    error,
    login,
    signup,
    switchToSignUp,
    switchToLogin,
  };
}

export default useLogin;
