import React from "react";
import styles from "../../pages/index.module.css";

type NewBtnProps = {
    handleNewGame: () => void;
};
const NewBtn = ({handleNewGame}: NewBtnProps) => {
    return (
        <div onClick={handleNewGame} className={styles.button}>
            <h3 className={styles.cardTitle}>GO</h3>
        </div>
    );
};

export default NewBtn;
