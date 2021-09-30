import React from "react";
import { withRouter } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

const ForbiddenPage = withRouter((props) => (
  <ErrorPage title="403 Forbidden">
    You are not permitted to access to {props.location.pathname}.
  </ErrorPage>
));
export default ForbiddenPage;
