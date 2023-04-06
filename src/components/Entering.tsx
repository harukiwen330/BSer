import React from "react";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../pages/index.module.css";

type EnteringProps = {
    langJson: LangJsonProps;
}
const Entering = ({langJson}:EnteringProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <span className={styles.yellowSpan}>
                        {langJson.entering}
                    </span>
                </h1>
            </div>
        </main>
    );
};

export default Entering
