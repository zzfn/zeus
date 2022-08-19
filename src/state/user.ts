import { createMachine } from 'xstate';

const promiseMachine = createMachine({
  id: 'loginState',
  initial: 'offline',
  states: {
    offline: {
      on: {
        login: 'loading',
      },
    },
    loading: {
      on: {
        success: 'online',
        failure: 'offline',
      },
    },
    online: {
      on: {
        logout: 'offline',
      },
    },
  },
});
export default promiseMachine;
