import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFileAlt,
  faFileImage,
  faFileAudio,
  faFileVideo,
  faFolder,
  faFile,
  faBirthdayCake,
  faArrowLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FileType } from "../../../FileType";
import { formatBytes } from "../../../SizeUnit";
import styles from "./ItemLink.module.css";

// ファイルの種類から FontAwesome アイコンを自動選択します
function getIcon(type: FileType): IconDefinition {
  const TYPE_TO_ICON: { [k in FileType]: IconDefinition } = {
    text: faFileAlt,
    image: faFileImage,
    audio: faFileAudio,
    video: faFileVideo,
    folder: faFolder,
    unknown: faFile,
  };
  if (type in TYPE_TO_ICON) {
    return TYPE_TO_ICON[type];
  }
  return faBirthdayCake;
}

export interface NavigableProps {
  href: string;
  name: string;
}

const HyperLink: React.FC<{ href: string; noRouter?: boolean }> = ({
  href,
  noRouter,
  children,
}) => {
  if (noRouter) {
    return <a href={href}>{children}</a>;
  } else {
    return <Link to={href}>{children}</Link>;
  }
};

// ItemLinkBase
interface ItemLinkBaseProps extends NavigableProps {
  icon: React.ReactElement;
  noRouter?: boolean;
}
const ItemLinkBase: React.FC<ItemLinkBaseProps> = (props) => {
  return (
    <div className={styles["file-container"]}>
      <HyperLink href={props.href} noRouter={props.noRouter}>
        <span className={styles["file"]} translate="no">
          <span className={styles["file-icon"]}>{props.icon}</span>
          <span className={styles["file-name"]}>{props.name}</span>
          {props.children}
        </span>
      </HyperLink>
    </div>
  );
};

// BackToParent
export interface BackToParentLinkProps {
  href: string;
  children?: never;
  invisible?: boolean;
}
export const BackToParentLink: React.FC<BackToParentLinkProps> = (props) => (
  <div style={{ display: props.invisible ? "none" : "initial" }}>
    <ItemLinkBase
      href={props.href}
      name=".."
      icon={<FontAwesomeIcon icon={faArrowLeft} />}
    />
  </div>
);

// FolderLink
export interface FolderLinkProps extends NavigableProps {
  children?: never;
}
export const FolderLink: React.FC<FolderLinkProps> = (props) => (
  <ItemLinkBase
    href={props.href}
    name={props.name + "/"}
    icon={<FontAwesomeIcon icon={faFolder} />}
  >
    <span className={styles["file-interaction-marker"]}>
      <FontAwesomeIcon icon={faChevronRight} />
    </span>
  </ItemLinkBase>
);

// FileLink
export interface FileLinkProps extends NavigableProps {
  type: FileType;
  size: number;
  children?: never;
}
export const FileLink: React.FC<FileLinkProps> = (props) => (
  <ItemLinkBase
    href={props.href}
    noRouter={true}
    name={props.name}
    icon={<FontAwesomeIcon icon={getIcon(props.type)} />}
  >
    <span className={styles["file-size"]}>
      {props.size && formatBytes(props.size, 1)}
    </span>
    <span className={styles["file-interaction-marker"]}>
      <FontAwesomeIcon icon={faChevronRight} />
    </span>
  </ItemLinkBase>
);
