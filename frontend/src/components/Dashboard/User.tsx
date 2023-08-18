'use client';

import React from 'react';
import { useAppSelector } from '../../redux/store';

export default function User() {
  const { user } = useAppSelector(state => state.auth);
  return (
    <div>
      Hi, {user?.firstName} {user?.lastName}
    </div>
  );
}
