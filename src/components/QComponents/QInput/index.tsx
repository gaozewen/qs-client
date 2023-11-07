import React, { FC } from "react";
import styles from './index.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder } = props;
  return (
    <>
      <p>{title}</p>
      <div className={styles['input-wrapper']}>
        <input name={fe_id} placeholder={placeholder} />
      </div>
    </>
  );
};

export default QInput;
