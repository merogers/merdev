import './Modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleRegisterModal } from '../../app/features/modalSlice';

export default function Register() {
  const { register } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const openClass = `modal${register ? ' modal--open' : ''}`;
  return (
    <section className={openClass} onClick={() => dispatch(toggleRegisterModal())}>
      Register
    </section>
  );
}
