import React, { FC } from "react";
import styles from "./index.module.scss";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: { text: string; value: string }[];
    value: string;
    isVertical: boolean;
  };
};

const QRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props;
  return (
    <>
      <p>{title}</p>
      <ul className={styles.list}>
        {options.map((opt) => {
          const { text, value: val } = opt;
          return (
            <li
              key={val}
              className={
                styles[isVertical ? "vertical-item" : "horizontal-item"]
              }
            >
              <label>
                <input
                  type="radio"
                  name={fe_id}
                  value={val}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QRadio;
