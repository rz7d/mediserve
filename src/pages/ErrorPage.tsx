import React from "react";

export interface ErrorPageProps {
  title: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => (
  <div style={{ textAlign: "center" }}>
    <h1>{props.title}</h1>
    <div>{props.children}</div>
  </div>
);
