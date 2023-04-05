import React, {type Dispatch, type SetStateAction} from "react";
import {Controller, PeopleFill} from "react-bootstrap-icons";
import styles from "../../pages/index.module.css";
type ManageBtnProps = {
    isManaging: boolean;
    setIsManaging: Dispatch<SetStateAction<boolean>>;
};

const ManageBtn = ({isManaging, setIsManaging}: ManageBtnProps) => {
    return (
        <div onClick={() => setIsManaging(!isManaging)} className={styles.manageBtn}>
            {isManaging ? <Controller /> : <PeopleFill />}
        </div>
    );
};

export default ManageBtn;
