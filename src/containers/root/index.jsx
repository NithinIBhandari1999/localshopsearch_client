import React from "react";
import { Route, Switch } from "react-router-dom";

import RouteSeperatePages from "./RouteSeperatePages";
import RouteSeperateUser from "./RouteSeperateUser";
import RouteSeperateShop from "./RouteSeperateShop";
import NotFound from "../pages/NotFound";

const Index = props => {

  return (
    <Switch>
      {RouteSeperateUser}
      {RouteSeperateShop}
      {RouteSeperatePages}

      <Route component={NotFound} />
    </Switch>
  );
};

export default Index;
