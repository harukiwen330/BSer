import React from "react";
import styles from "../pages/index.module.css";

const Entering = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <span className={styles.yellowSpan}>
                        <i>Entering</i>
                    </span>
                </h1>
            </div>
        </main>
    );
};

export default Entering
