import React from 'react';
import Chart from 'react-apexcharts';
import { API } from '../../../../config';
import Axios from 'axios';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const DashboardLinecharts = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const [totalSells, setTotalSells] = useState([]);

  const data = {
    options: {
      chart: {
        id: 'TotalSells',
      },
      xaxis: {
        categories: [2017, 2018, 2019, 2020, 2021],
      },
    },
    series: [
      {
        name: 'Total Sells',
        data: totalSells,
      },
    ],
  };

  useEffect(() => {
    Axios.get(`${API}/dashboard/total-sells/`, {
      headers: { Authorization: 'JWT ' + userInfo.userInfo.token },
    })
      .then((res) => {
        console.log('total sells data', res);

        let numbers = [];

        for (const dataObj of res.data.context) {
          numbers.push(dataObj.total_sell);
        }

        setTotalSells(numbers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Chart {...data} type="area" width="100%" height="400" />;
};

export default DashboardLinecharts;
