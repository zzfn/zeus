import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

function useAccess() {
  let user = useSelector((state: RootState) => state.user);
  const [access, setAccess] = useState({
    isAdmin: false,
  });
  useEffect(() => {
    // user.info &&
    //   setAccess({
    //     isAdmin: user.info.roleList?.some((_: any) => _.roleValue === 'ROLE_ADMIN'),
    //   });
    user.info && setAccess({ isAdmin: true });
  }, [user]);
  return access;
}

export default useAccess;
