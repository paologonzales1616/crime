import React from "react";
import Clock from "react-live-clock";
import { Row } from "reactstrap";
import moment from "moment";
import "./AppClock.css";
const date = Date.now();

const m = moment();
const x = m.isoWeekday();
let day = "";
switch (x) {
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "Sunday";
    break;
}

const AppClock = () => {
  return (
    <Row className="app-clock-div text-center">
      <Clock
        format="HH:mm:ss"
        ticking={true}
        interval={1000}
        className="app-clock"
      />
      <p className="app-date">{day} {m.format("LL")}</p>

      {/* <Clock format={'MMMM MM, YYYY dddd'} className="app-date" /> */}
    </Row>
  );
};

export default AppClock;
