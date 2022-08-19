import { useEffect, useState } from 'react';

const useMenu = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const files = require.context('../routes/', true, /.tsx$/);
    const components = files
      .keys()
      .map((item) => {
        return {
          path: item.replace('./', '').replace('/index.zh-CN.md', ''),
          component: files(item).default,
        };
      })
      .filter((item) => item.path);
    setList(components);
    console.log(components);
  }, []);
  return list;
};
export default useMenu;
