import { useState } from "react";
import { PanelResizeHandle } from "react-resizable-panels";

import styles from "./css/ResizeHandle.css";

export default function ResizeHandle({
  className = "",
  id
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(" ")}
      id={id}    
    >
      <div className={styles.ResizeHandleInner}>
      <svg className={styles.Icon} t="1682169068529" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610"><path d="M448 245.333333c0 29.866667 23.466667 53.333333 53.333333 53.333334s53.333333-23.466667 53.333334-53.333334-23.466667-53.333333-53.333334-53.333333-53.333333 23.466667-53.333333 53.333333zM448 522.666667c0 29.866667 23.466667 53.333333 53.333333 53.333333s53.333333-23.466667 53.333334-53.333333-23.466667-53.333333-53.333334-53.333334-53.333333 23.466667-53.333333 53.333334zM448 800c0 29.866667 23.466667 53.333333 53.333333 53.333333s53.333333-23.466667 53.333334-53.333333-23.466667-53.333333-53.333334-53.333333-53.333333 23.466667-53.333333 53.333333z" fill="#666666" p-id="2611"></path></svg>
      </div>
    </PanelResizeHandle>
  );
}
