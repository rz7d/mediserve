import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { typeFromExtension } from "../FileType";
import * as Path from "../Path";
import { index, DirectoryIndex } from "../controller/NginxProvider";
import Explorer, { ExplorerContext } from "../components/explorer/Explorer";
import { FileLink, FolderLink } from "../components/explorer/index/ItemLink";
import {
  FolderView,
  FolderViewEntry,
} from "../components/explorer/index/FolderView";

const BrowserPage = withRouter((props) => {
  const location = props.location.pathname;
  const [ctx, setCtx] = useState<ExplorerContext>({
    baseUri: "",
    cwd: Path.empty(),
  });
  const [items, setItems] = useState<FolderViewEntry[]>();
  useEffect(() => {
    async function makeState() {
      const cwd = Path.parse(location).canonicalize();
      setCtx({ baseUri: "", cwd });
      const response = await index(location);
      if (!response.ok) {
        setItems([]);
        return;
      }
      const indexData = response.body as DirectoryIndex;
      setItems(
        Array.from(indexData).map((entry, i) => {
          const href = cwd.resolve(entry.name).toUri();
          if (entry.type === "directory") {
            return <FolderLink key={i} href={href} name={entry.name} />;
          } else {
            return (
              <FileLink
                key={i}
                href={href}
                name={entry.name}
                type={typeFromExtension(entry.name)}
                size={entry.size}
              />
            );
          }
        })
      );
    }
    makeState();
  }, [location]);
  return (
    <Explorer ctx={ctx}>
      <FolderView ctx={ctx}>{items}</FolderView>
    </Explorer>
  );
});

export default BrowserPage;
