import { useTypedSelector } from '../redux/store';
import { Navigate } from 'react-router-dom';
import type { Node } from '../types';

export default function ProtectRoute({ children }: Node) {
  const { user } = useTypedSelector(state => state.auth);

  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
