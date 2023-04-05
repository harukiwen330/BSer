import React from "react";
import styles from "../../pages/index.module.css";
type LangBtnProps = {
    lang: string;
    handleLangChange: () => void;
};
const LangBtn = ({lang, handleLangChange}: LangBtnProps) => {
    return (
        <div onClick={handleLangChange} className={styles.cornerBtn}>
            {lang === "en" && "🇭🇰"}
            {lang === "zh" && "🇺🇸"}
        </div>
    );
};

export default LangBtn;
