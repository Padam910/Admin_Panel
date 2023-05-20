import {
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton
} from "@mui/material";

import Chart from "react-apexcharts";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  revenueRequest
} from "./Revenue.action";

const Revenue = ()=>{
  const dispatch = useDispatch();
  const {RevenueReducer} = useSelector(response=>response);
  const getRevenue = useRef();
  getRevenue.current = ()=>{
    return dispatch(revenueRequest());
  }
  const setRevenue = useRef();
  setRevenue.current = ()=>{
    return (
      setCat(RevenueReducer.data.months),
      setSeries([
        {
          name: "Earning",
          data: RevenueReducer.data.earning
        },
        {
          name: "Expenses",
          data: RevenueReducer.data.expenses
        }
      ])
    );
  }
  useEffect(()=>{
    if(RevenueReducer.isLoading === null)
    {
      getRevenue.current();
    }
    if(RevenueReducer.success)
    {
      setRevenue.current();
    }
  },[RevenueReducer]);

  const [cat,setCat] = useState([]);
  const options = {
    xaxis: {
      categories: cat
    },
    chart: {
      toolbar: {
        tools: {
          download: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    }
  };
  const [series,setSeries] = useState([]);
  const design = (
    <>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            {
              RevenueReducer.isLoading ? <div>
                <div className="d-flex justify-content-between">
                  <Skeleton variant="circular" width={80} height={80} sx={{mr: 2}} />
                  <div className="d-flex flex-column flex-grow-1">
                    <Skeleton variant="rectangular" width={"100%"} height={40} sx={{mb:1}}/>
                    <Skeleton variant="text" width={"100%"} />
                  </div>
                </div>
                <Skeleton variant="rectangular" width={"100%"} height={320} sx={{mt: 1}}/>
              </div> : <div>
              <Typography gutterBottom variant="h5" component="div">
                Revenue Updates
              </Typography>
              <Chart
                options={options}
                series={series}
                type="line"
                height="350px"
              ></Chart>
              </div>
            }

          </CardContent>
        </Card>
      </Grid>
    </>
  );
  return design;
}

export default Revenue;
