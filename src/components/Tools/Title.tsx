import React from "react";
import type { LangJsonProps } from "~/languages/langJsonProps";
import styles from "../../pages/index.module.css";

type TitleProps = {
    langJson: LangJsonProps;
};

const Title = ({langJson}: TitleProps) => {
    return (
        <h1 className={styles.title}>
            <span className={styles.yellowSpan}>
                <i>{langJson.title}</i>
            </span>
        </h1>
    );
};

export default Title;
