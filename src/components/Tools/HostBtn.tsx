import React from "react";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type HotBtnProps = {
    handleHost: () => void;
    langJson: LangJsonProps
};

const HostBtn = ({langJson, handleHost}: HotBtnProps) => {
    return (
        <div onClick={handleHost} className={styles.button}>
            <h3 className={styles.cardTitle}>{langJson.host}</h3>
        </div>
    );
};

export default HostBtn;
