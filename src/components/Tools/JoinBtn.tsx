import React from "react";
import styles from "../../pages/index.module.css";

type JoinBtnProps = {
    handleJoin: () => void;
};
const JoinBtn = ({handleJoin}: JoinBtnProps) => {
    return (
        <div onClick={handleJoin} className={styles.button}>
            <h3 className={styles.cardTitle}>JOIN</h3>
        </div>
    );
};

export default JoinBtn;
