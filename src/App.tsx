import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const BrowserPage = React.lazy(() => import("./pages/BrowserPage"));
const BadRequestPage = React.lazy(() => import("./pages/BadRequestPage"));
const ForbiddenPage = React.lazy(() => import("./pages/ForbiddenPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const ServerErrorPage = React.lazy(() => import("./pages/ServerErrorPage"));

export const App: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<></>}>
      <Switch>
        <Route path="/errors/400" component={BadRequestPage} exact />
        <Route path="/errors/403" component={ForbiddenPage} exact />
        <Route path="/errors/404" component={NotFoundPage} exact />
        <Route path="/errors/50x" component={ServerErrorPage} exact />
        <Route path="/" component={BrowserPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
