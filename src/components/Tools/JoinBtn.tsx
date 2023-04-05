import React from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type JoinBtnProps = {
    langJson: LangJsonProps;
    handleJoin: () => void;
};
const JoinBtn = ({langJson, handleJoin}: JoinBtnProps) => {
    return (
        <div onClick={handleJoin} className={styles.button}>
            <h3 className={styles.cardTitle}>{langJson.join}</h3>
        </div>
    );
};

export default JoinBtn;
