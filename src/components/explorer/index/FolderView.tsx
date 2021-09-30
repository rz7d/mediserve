import React from "react";
import { BackToParentLink, FileLink, FolderLink } from "./ItemLink";
import { ExplorerContext } from "../Explorer";
import styles from "./FolderView.module.css";

export type FolderViewEntry =
  | React.ReactElement<typeof FileLink>
  | React.ReactElement<typeof FolderLink>;

export type FolderViewProps = {
  ctx: ExplorerContext;
  children?: FolderViewEntry[];
};

export const FolderView: React.FC<FolderViewProps> = ({ ctx, children }) => {
  return (
    <ul className={styles["tree-list"]}>
      <BackToParentLink
        href={ctx.cwd.parent().toUri(ctx.baseUri)}
        invisible={false && ctx.cwd.canonicalize().isEmpty()}
      />
      {children?.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
};
