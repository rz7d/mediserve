import React from "react";
import { Path } from "../../Path";
import { AddressBar } from "./AddressBar";
import styles from "./Explorer.module.css";

export interface ExplorerContext {
  baseUri: string;
  cwd: Path;
}

export interface ExplorerProps {
  ctx: ExplorerContext;
}

export const Explorer: React.FC<ExplorerProps> = ({ ctx, children }) => (
  <div className="Explorer">
    <header className={styles["AddressBar-container"]}>
      <AddressBar ctx={ctx} />
    </header>
    <main>{children}</main>
  </div>
);

export default Explorer;
