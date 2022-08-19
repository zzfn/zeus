import { useMachine } from '@xstate/react';
import promiseMachine from '../state/user';

function useStatus() {
  const [state, send] = useMachine(promiseMachine);
  return [state, send];
}

export default useStatus;
