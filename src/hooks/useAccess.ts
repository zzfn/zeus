import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

function useAccess() {
  let user = useSelector((state: RootState) => state.user);
  const [access, setAccess] = useState({
    isAdmin: false,
  });
  useEffect(() => {
    console.log(user.info && user.info.isAdmin);
    user.info && setAccess({ isAdmin: user.info.isAdmin });
  }, [user]);
  return access;
}

export default useAccess;
