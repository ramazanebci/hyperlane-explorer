import { PropsWithChildren } from 'react';

interface Props {
  width?: string;
  classes?: string;
}

export function Card(props: PropsWithChildren<Props>) {
  const { width, classes } = props;
  return (
    <div
      className={`${width} p-4 bg-white shadow-md rounded overflow-auto ${classes}`}
    >
      {props.children}
    </div>
  );
}