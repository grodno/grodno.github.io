import resources from "./res.js";
import pipes from "./pipes";

import  "arrmatura/commons/index.css";

import { launch, commons } from "arrmatura";

import components from "components";
import App from "./App.html";
import * as commonServices from "services";

import main from "./modules/main.html";
import calendar from "./modules/calendar.html";
import geomap from "./modules/map.html";
import news from "./modules/news.html";
import ads from "./modules/ads.html";
import afisha from "./modules/afisha.html";
import findyou from "./modules/findyou.html";
import others from "./modules/others.html";

const types = [
  ...commons.types,
  ...components,
  App,
  main,
  news,
  ads,
  calendar,
  geomap,
  afisha,
  findyou,
  others,
  ...Object.values(commonServices),
];

const run = () => {
  window.app = launch({
    template: "<Top/>",
    types,
    resources,
    pipes,
  });
};

((hot) => {
  if (hot) {
    hot.dispose((data) => window.app.$.done(data));
    hot.accept();
  }
  run();
})(typeof module === "undefined" ? null : module.hot);
