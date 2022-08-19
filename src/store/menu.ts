import { createModel } from '@rematch/core';
import type { RootModel } from './index';
import { menuList } from '../service/menu';
type MenuType = {
  component: string;
  createBy: string;
  createTime: string;
  icon?: any;
  id: string;
  isDelete: number;
  isShow: number;
  orderNum: number;
  name: string;
  parentId?: any;
  path: string;
  updateBy: string;
  updateTime: string;
};
export const menu = createModel<RootModel>()({
  state: [] as MenuType[],
  reducers: {
    updateMenu(_, payload) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async updateMenuInfo() {
      const { data, code } = await menuList({});
      code === 0 && dispatch.menu.updateMenu(data);
    },
  }),
});
