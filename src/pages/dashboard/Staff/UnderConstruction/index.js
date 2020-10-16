import React from "react";
import {history} from "helpers"
import { useSelector } from "react-redux"
import { STAFF_ROLE_ID } from "helpers/variables"
import comingSoon from "assets/images/coming_soon.svg"
const UnderConstruction = () =>{
    // export const STAFF_ROLE_ID = {
    //     ADMIN: 1,
    //     SMMU: 2,
    //     DMMU: 3,
    //     BMMU: 4,
    //     GPLF: 5,
    //     CLF: 6,
    //     ALL: 7,
    //     PUBLIC: 8,
    // };

    let profile = useSelector((state)=>state.profile)

    const onClick = () =>{
        if(profile.role !== STAFF_ROLE_ID.PUBLIC){
            history.push("/staff/home")
        }else{
            history.push("/user/dashboard")
        }
    }
    return (
        <div className="container-fluid coming-soon d-flex align-items-center flex-column justify-content-center">
            <img src={comingSoon} width="50%" className="mt-5" alt="coming Soon" />
            <p className="my-3 fw-900 d-flex align-items-center justify-content-center">
            Coming Soon ...     
            </p>
            <span className="d-flex align-items-center justify-content-center backToDashboard" onClick={onClick}>Go Back to Dashboard</span>
        </div>
    )
}

export { UnderConstruction }