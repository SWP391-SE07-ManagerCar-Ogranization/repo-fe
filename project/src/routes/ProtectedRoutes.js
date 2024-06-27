import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children, roles }) {
  const role = useAuth();
  const navigate = useNavigate();
  const role2 = localStorage.getItem("role");
  console.log("nhieu role: ", roles);
  console.log("1 role: ", role2);
  useEffect(() => {
    if (role2 === null) {
      navigate('/login', { replace: true });
    }
	else if(!roles.includes(role2)) {
		navigate('/*');
	}
  }, [navigate, role, roles,role2]);

  return children;
}
