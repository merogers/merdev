import { useEffect } from 'react';
import { useTypedSelector } from '../redux/store';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useLazyRefreshQuery } from '../redux/services/auth';
import type { User } from '../redux/services/auth';

type Credentials = {
  user: User;
  authorizationToken: string;
};

export default function ProtectRoute() {
  const { user } = useTypedSelector(state => state.auth);

  const [fetchTrigger] = useLazyRefreshQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function reAuth() {
      if (user) return;
      
      const result = await fetchTrigger();
      if (!result.isSuccess) navigate('/login');
      dispatch(setCredentials(result.data as Credentials));
    }
      reAuth();
    // eslint-disable-next-line
  }, []);

  return <Outlet />;
}
