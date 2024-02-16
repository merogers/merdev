'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutQuery } from '../redux/api/apiSlice';
import Main from '../components/Main';
import Container from '../components/Container';
import { logOut } from '../redux/features/auth/authSlice';
import Card from '../components/Card';

export default function LogoutPage() {
  const { isLoading } = useLogoutQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false) {
      dispatch(logOut());
      return navigate('/login');
    }

    // TODO: Is this the right thing to do?
    return (): void => {};
  }, [isLoading, dispatch, navigate]);

  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full max-w-xl mx-auto">
            <Card>
              <div className="p-8 mx-auto">Logging out user... </div>
            </Card>
          </div>
        </div>
      </Container>
    </Main>
  );
}
