import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate, useLocation} from "react-router-dom";
import {Spin} from "antd";

function Auth({children}: { children: JSX.Element }) {
    let user = useSelector((state: RootState) => state.user);
    let location = useLocation();
    if (user.loginState === false) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    } else if (user.loginState === true) {
        return children;
    } else {
        return <Spin spinning={user.loginState === undefined} tip="Loading...">
            {children}
        </Spin>;
    }
}

export default Auth
