import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import store from "./store/store";
import App from "./App";

moment.updateLocale("fr", {
  calendar: {
    lastDay: "[Hier]",
    sameDay: "HH:mm",
    lastWeek: "dddd",
    sameElse: "D/M/YY",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/:realtorId" component={App} />
      <Route exact path="/:realtorId/:messageId" component={App} />
    </Router>
  </Provider>,

  document.getElementById("root")
);
