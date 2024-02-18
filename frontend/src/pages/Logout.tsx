import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutQuery } from '../redux/services/auth';
import Main from '../components/Main';
import Container from '../components/Container';
import { logout } from '../redux/features/auth/authSlice';
import Spinner from '../components/Spinner';

export default function LogoutPage() {
  const { isLoading } = useLogoutQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false) {
      dispatch(logout());
      return navigate('/login');
    }

    return (): void => {};
  }, [isLoading, dispatch, navigate]);

  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8 h-full">
          <div className="flex w-full flex-col max-w-3xl mx-auto h-full">
            <Spinner message="Logging Out..." />
          </div>
        </div>
      </Container>
    </Main>
  );
}
