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
      // If you are already logged in, ignore this.
      if (user) return;

      // Hit refresh query - This any is a total can of worms.
      const result = await fetchTrigger();

      // If you have auth, set user and go to dashboard
      if (!result.isSuccess) {
        return navigate('/login');
      }
      dispatch(setCredentials(result.data as Credentials));
      return navigate('/dashboard');
    }
    reAuth();
  }, [user, dispatch, fetchTrigger, navigate]);

  return <Outlet />;
}
