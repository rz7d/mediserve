import React from "react";
import { withRouter } from "react-router-dom";

import { ErrorPage } from "./ErrorPage";

const NotFoundPage = withRouter((props) => (
  <ErrorPage title="404 Not Found">{props.location.pathname} is not found.</ErrorPage>
));

export default NotFoundPage;
