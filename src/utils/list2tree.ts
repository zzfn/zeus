export function list2tree(list: any[], { id = 'id', pid = 'pid', children = 'children' } = {}) {
  return list.reduce((prev: any, curr: any) => {
    const obj = list.find((item: any) => item[id] === curr[pid]); // 根据当前项找出父节点
    if (obj) {
      // 存在父节点
      !Object.prototype.hasOwnProperty.call(obj, 'children') && (obj[children] = []); // 父节点无[children]属性，初始化[children]
      obj[children].push(curr); // 把当前节点推进父节点[children]
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
}
