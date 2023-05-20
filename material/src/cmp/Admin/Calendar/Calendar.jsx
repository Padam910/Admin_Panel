import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import "./Calendar.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  useRef
} from "react";

const Calendar = ()=>{
  const cal = useRef();

  const next = ()=>{
    const calendar = cal.current.getApi();
    calendar.next();
  }

  const prev = ()=>{
    const calendar = cal.current.getApi();
    calendar.prev();
  }

  const today = ()=>{
    const calendar = cal.current.getApi();
    calendar.today();
  }

  const todayDate = ()=>{
    const date = new Date();
    let dd = date.getDate();
    let mm = date.toLocaleDateString('default',{month:'short'});
    let yy = date.getFullYear();
    return dd+" "+mm+" "+yy;
  }
  const design = (
    <>
      <Card className="shadow-sm border">
        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center p-4">
            <ButtonGroup variant="outlined">
              <Button className="py-2" onClick={prev}>
                <span className="material-icons-outlined">arrow_left</span>
                Prev
              </Button>
              <Button className="py-2" onClick={next}>
                Next
                <span className="material-icons-outlined">arrow_right</span>
              </Button>
            </ButtonGroup>

            <Typography gutterBottom variant="h5" component="div">
              { todayDate() }
            </Typography>

            <Button variant="outlined" color="warning" onClick={today}>Today</Button>
          </div>

          <FullCalendar
            ref={cal}
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={
              [
                {
                  title: "Birthday",
                  date: "2022-02-22",
                  color: "red"
                },
                {
                  title: "Purchase Car",
                  date: "2022-02-24",
                  color: "blue"
                }
              ]
            }
            eventDisplay="list-item"
            headerToolbar={{
              start: "",
              center: "",
              end: ""
            }}
          />
        </CardContent>
      </Card>
    </>
  );
  return design;
}

export default Calendar;
