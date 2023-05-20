import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import Chart from "react-apexcharts";
import "./Congratulation.css";
import {
  useState
} from "react";
import {
  useSelector
} from "react-redux";

const Congratulation = ()=>{
  const {AdminReducer} = useSelector(response=>response);
  const options = {
    chart: {
      toolbar: {
        tools: {
          download: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      sparkline: {
        enabled: true
      }
    },
    theme: {
      palette: "palette2"
    },
    title: {
      text: "$10,000",
      offsetX: 8,
      offsetY: 8,
      style: {
        fontSize: "18px",
        color: AdminReducer.dark ? "white" : 'inherit'
      }
    }
  };
  const [series] = useState([
    {
      name: "Earning",
      data: [100,150,80,50,96,10,100,500,600,100,150,80,50,96,10,1000,500,600,100,150,80,50,96,10,100,500,600,100,150,80,50,96,10,1000,500,600]
    }
  ])
  const design = (
    <>
      <Grid item xs={12} sm={5}>
        <Card className="chart-box" sx={{
          bgcolor: AdminReducer.dark ? "#1E1E1E" : 'white'
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sales
            </Typography>
            <Chart
              options={options}
              series={series}
              height="160px"
              type="area"
              className="chart"
            >
            </Chart>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
  return design;
}

export default Congratulation;
