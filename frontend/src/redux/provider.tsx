import { Provider } from 'react-redux';
import { store } from './store';
import { Node } from '../types';

export default function ReduxProvider({ children }: Node) {
  return <Provider store={store}>{children}</Provider>;
}
