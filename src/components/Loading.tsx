import React from "react";
import styles from "../pages/index.module.css";
import MenuBtn from "./Tools/MenuBtn";

type LoadingProps = {
    returnMenu: () => void;
};

const Loading = ({returnMenu}: LoadingProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Room is {" "}
                    <span className={styles.yellowSpan}>
                        <i>Empty</i>
                    </span>
                </h1>
                <MenuBtn 
                    returnMenu={returnMenu}
                />
            </div>
        </main>
    );
};

export default Loading;
