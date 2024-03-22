import './Modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleLoginModal } from '../../app/features/modalSlice';

export default function Login() {
  const { login } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const openClass = `modal${login ? ' modal--open' : ''}`;
  return (
    <section className={openClass} onClick={() => dispatch(toggleLoginModal())}>
      Login
    </section>
  );
}
