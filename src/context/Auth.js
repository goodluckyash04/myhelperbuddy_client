import { useNavigate } from 'react-router';

const { createContext } = require('react');

export const AuthContext = createContext();
export default function AuthState({ children }) {
  const signinNavigate = useNavigate();
  const login = async (identifier, password) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/goex/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(identifier, password)
    });
    const signinResponse = await response.json();
    localStorage.setItem('token', signinResponse.token);
    if (response.ok) {
      signinNavigate('/');
    }
  };
  return <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>;
}
