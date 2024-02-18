import { useEffect, useState } from 'react';

const useMenu = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const files = require.context('../routes/', true, /.tsx$/);
    const components = files
      .keys()
      .map((item) => {
        return {
          componentPath: item.replace('./', ''),
          path: item.replace(/^(\.\/)?([^.]+)\.(.*)$/, '$2'),
          component: files(item).default,
        };
      })
      .filter((item) => item.path);
    setList(components);
  }, []);
  return list;
};
export default useMenu;
