import React from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type NewBtnProps = {
    langJson: LangJsonProps;
    handleNewGame: () => void;
};
const NewBtn = ({langJson, handleNewGame}: NewBtnProps) => {
    return (
        <div onClick={handleNewGame} className={styles.button}>
            <h3 className={styles.cardTitle}>{langJson.startGame}</h3>
        </div>
    );
};

export default NewBtn;
