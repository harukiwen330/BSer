import React from "react";
import styles from "../../pages/index.module.css";

type HotBtnProps = {
    handleHost: () => void;
};

const HostBtn = ({handleHost}: HotBtnProps) => {
    return (
        <div onClick={handleHost} className={styles.button}>
            <h3 className={styles.cardTitle}>HOST</h3>
        </div>
    );
};

export default HostBtn;
