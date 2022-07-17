import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useEffect, useState} from "react";

function useAccess() {
    let user = useSelector((state: RootState) => state.user);
    const [access,setAccess]=useState({
        isAdmin:false
    })
    useEffect(()=>{
        setAccess({
            isAdmin: user.info.roleValue==='ROLE_ADMIN'
        })
    },[user])
    return access
}
export default useAccess