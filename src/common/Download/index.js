import * as React from "react";
import { memo } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Download as DownloadIcon } from "react-feather";
import { useRecoilValue } from "recoil";

import { IconButton } from "components";
import getDefaultTemplate from "templates/default/default-template";
import getCreateReactApp from "fixtures/create-react-app";
import saveJsZip from "services/saveJsZip";
import * as S from "selectors";

export const Download = memo(() => {
  const schema = useRecoilValue(S.schemaState);
  const theme = useRecoilValue(S.theme);
  const handleDownload = async () => {
    const createReactApp = getCreateReactApp({ theme });
    console.log(`export default ${JSON.stringify(schema)}`)
    const defaultTemplate = getDefaultTemplate(schema);
    const app = [...createReactApp, ...defaultTemplate];
    const { file } = await saveJsZip.create(app);
    const content = await JSZip.loadAsync(file);
    console.log({ file, content });
    saveAs(file, "cardzilla-template.zip");
  };
  return (
    <IconButton
      size="md"
      variantColor="gray"
      variant="solid"
      aria-label="Settings"
      className="bg-gray-300"
      onClick={handleDownload}
    >
      <DownloadIcon size={18} />
    </IconButton>
  );
});
