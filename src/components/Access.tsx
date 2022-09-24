import useAccess from '../hooks/useAccess';

const Access = (props: any) => {
  const access = useAccess();
  return access.isAdmin && props.children;
};
export default Access;
