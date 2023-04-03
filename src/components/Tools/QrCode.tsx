import {QRCodeSVG} from "qrcode.react";
import React, {useState} from "react";
import styles from "../../pages/index.module.css";

type QrCodeProps = {
    url: string;
};
const QrCode = ({url}: QrCodeProps) => {
    const [urlState, setUrlState] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setUrlState(true);
    };
    return (
        <div onClick={handleCopy as VoidFunction} className={styles.button}>
            <h4 className={styles.cardTitle}>{urlState ? "Copied" : "Tab to copy link"}</h4>
            <QRCodeSVG size={256} fgColor={`#FFFFFF`} bgColor={`#15aaaa`} onClick={handleCopy as VoidFunction} value={url} />
        </div>
    );
};

export default QrCode;
