import QInput from "./QInput";
import QRadio from "./QRadio";

type ComponentInfoType = {
  fe_id: string;
  type: string;
  isHidden: string;
  props: any;
};

export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp;

  if (isHidden) return null;

  if (type === "input") {
    return <QInput fe_id={fe_id} props={props} />;
  }

  if (type === "radio") {
    return <QRadio fe_id={fe_id} props={props} />;
  }

  if (type === "checkbox") {
    return null;
  }

  if (type === "title") {
    return null;
  }

  if (type === "paragraph") {
    return null;
  }

  if (type === "info") {
    return null;
  }

  if (type === "textarea") {
    return null;
  }

  return null;
};
