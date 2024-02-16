import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { useLazyRefreshQuery } from '../redux/api/apiSlice';
import { setCredentials } from '../redux/features/auth/authSlice';

import type { Node } from '../types';

export default function ReAuth({ children }: Node) {
  const { user } = useAppSelector(state => state.auth);
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
      if (result.data) {
        dispatch(setCredentials(result.data));
        navigate('/dashboard');
      }
    }
    reAuth();
    // NOTE: Only run on initial load. This is just for persisting authentication.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
