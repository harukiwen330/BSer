import React from "react";
import styles from "../../pages/index.module.css";
type LangBtnProps = {
    lang: string;
    handleLangChange: () => void;
};
const LangBtn = ({lang, handleLangChange}: LangBtnProps) => {
    return (
        <div onClick={handleLangChange} className={styles.button}>
            {lang === "en" && <h3>🇭🇰🇹🇼</h3>}
            {lang === "zh" && <h3>🇺🇸🇬🇧</h3>}
        </div>
    );
};

export default LangBtn;
