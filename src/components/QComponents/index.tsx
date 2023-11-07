import QCheckbox from "./QCheckbox";
import QInfo from "./QInfo";
import QInput from "./QInput";
import QParagraph from "./QParagraph";
import QRadio from "./QRadio";
import QTextarea from "./QTextarea";
import QTitle from "./QTitle";

type ComponentInfoType = {
  fe_id: string;
  type: string;
  isHidden: string;
  props: any;
};

export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp;

  if (isHidden) return null;

  if (type === "info") {
    return <QInfo {...props} />;
  }

  if (type === "title") {
    return <QTitle {...props} />;
  }

  if (type === "paragraph") {
    return <QParagraph {...props} />;
  }

  if (type === "input") {
    return <QInput fe_id={fe_id} props={props} />;
  }

  if (type === "textarea") {
    return <QTextarea fe_id={fe_id} props={props} />;
  }

  if (type === "radio") {
    return <QRadio fe_id={fe_id} props={props} />;
  }

  if (type === "checkbox") {
    return <QCheckbox fe_id={fe_id} props={props} />;
  }

  return null;
};
