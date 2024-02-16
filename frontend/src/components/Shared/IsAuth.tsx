'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/store';
import { useLazyRefreshQuery } from '../../redux/api/apiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

export default function IsAuth() {
  const { user } = useAppSelector(state => state.auth);
  const [fetchTrigger] = useLazyRefreshQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function isAuth() {
      // If you are already logged in, ignore this.
      if (user) return;

      // Hit refresh query - This any is a total can of worms.
      const result = await fetchTrigger();

      // If you have auth, set user and go to dashboard
      if (result.data) {
        dispatch(setCredentials(result.data));
        router.push('/dashboard');
      }
    }
    isAuth();
    // NOTE: Only run on initial load. This is just for persisting authentication.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
