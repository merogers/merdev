import { useAppSelector } from '../redux/store';
import { Navigate } from 'react-router-dom';
import type { Node } from '../types';

export default function ProtectRoute({ children }: Node) {
  const { user } = useAppSelector(state => state.auth);

  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
