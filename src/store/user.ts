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
        // handle state changes with pure functions
        updateUser(state, payload) {
            return {...state, ...payload};
        },
    },
    effects: (dispatch) => ({
        async updateUserState() {
            dispatch.user.updateUser({loading: true})
            const {data, code} = await getUserState();
            if (code === 0) {
                dispatch.user.updateUser({loginState: data})
            } else {
                dispatch.user.updateUser({loginState: false})
            }
            dispatch.user.updateUser({loading: false})
        },
        async updateUserInfo() {
            const {data, code} = await getUserInfo();
            if (code === 0) {
                dispatch.user.updateUser({info: data})
            }
        },
    }),
});
