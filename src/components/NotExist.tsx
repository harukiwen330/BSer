import React from "react";
import type {LangJsonProps} from "~/languages/langJsonProps";
import styles from "../pages/index.module.css";
import MenuBtn from "./Tools/MenuBtn";

type NotExistProps = {
    langJson: LangJsonProps;
    returnMenu: () => void;
};

const NotExist = ({langJson, returnMenu}: NotExistProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <span className={styles.yellowSpan}>
                    <i>{langJson.notExist}</i>
                </span>
                <MenuBtn returnMenu={returnMenu} />
            </div>
        </main>
    );
};

export default NotExist;
