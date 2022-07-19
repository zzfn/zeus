import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate, useLocation } from 'react-router-dom';

function Auth({ children }: { children: JSX.Element }) {
  let user = useSelector((state: RootState) => state.user);
  let location = useLocation();
  if (user.loginState === false) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}

export default Auth;
