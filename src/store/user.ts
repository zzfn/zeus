import {createModel} from '@rematch/core';
import type {RootModel} from './index';
import {getUserInfo, getUserState} from "../service/user";

type InfoType = {
    avatar: string;
    createBy?: any;
    createTime?: any;
    id: string;
    isDelete?: any;
    nickName: string;
    openid?: any;
    roleList?: any;
    roleName: string;
    roleValue: string;
    updateBy?: any;
    updateTime?: any;
    username: string;
}

type User = {
    loading: boolean;
    loginState?: boolean,
    info?: InfoType,
}
export const user = createModel<RootModel>()({
    state: {
        loading: false,
        loginState: undefined,
        info: undefined
    } as User,
    reducers: {
        updateUser(state, payload) {
            return {...state, ...payload};
        },
    },
    effects: (dispatch) => ({
        async updateUserState() {
            if (sessionStorage.getItem('uid')) {
                dispatch.user.updateUser({loading: true})
                const {code} = await getUserState();
                if (code === 0) {
                    dispatch.user.updateUser({loginState: true, loading: false,})
                } else {
                    dispatch.user.updateUser({loginState: false, loading: false,})
                }
            } else {
                dispatch.user.updateUser({loading: false, loginState: false})
            }
        },
        async updateUserInfo() {
            if (sessionStorage.getItem('uid')) {
                const {data, code} = await getUserInfo();
                code === 0 && dispatch.user.updateUser({info: data, loginState: true, loading: false})
            }
        },
    }),
});
