'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/store';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useRefreshQuery } from '../../redux/api/apiSlice';

export default function User() {
  const { user } = useAppSelector(state => state.auth);
  const { data, error, isLoading } = useRefreshQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // Refresh token and log in
        if (isLoading === false) {
          dispatch(setCredentials(data));
        }
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    };

    // If no user, check refresh token
    if (!user) {
      router.push('login');
    } else {
      verifyRefreshToken();
    }
  }, [isLoading, user, router, data, dispatch, error]);

  if (user)
    return (
      <div>
        <div>
          Hi, {user?.firstName} {user?.lastName}
        </div>
      </div>
    );
}
