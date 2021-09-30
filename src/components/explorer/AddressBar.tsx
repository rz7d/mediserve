import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ExplorerContext } from "./Explorer";
import { Path } from "../../Path";
import styles from "./AddressBar.module.css";

export type AddressBarProps = {
  ctx: ExplorerContext;
  children?: never;
};

export const AddressBar: React.FC<AddressBarProps> = ({ ctx }) => {
  const paths: Path[] = [];
  let { cwd } = ctx;
  while (!cwd.isEmpty()) {
    paths.unshift(cwd);
    cwd = cwd.parent();
  }
  paths.unshift(cwd);
  return (
    <div className={styles["AddressBar-container"]}>
      <ul className={styles["AddressBar-breadcrumb"]}>
        {paths.map((name, i) => (
          <li className={styles["AddressBar-item"]} key={i}>
            <Link to={name.stringify()}>
              <span className={styles["AddressBar-breadcrumb-separator"]}>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <span className={styles["AddressBar-itemName"]}>
                {name.name ?? "Index"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
