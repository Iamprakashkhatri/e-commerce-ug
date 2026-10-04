import React from 'react';
import Chart from 'react-apexcharts';
import { API } from '../../../../config';
import Axios from 'axios';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const DashboardBarcharts = () => {
  const [options, setOptions] = useState({
    xaxis: {
      categories: [2017, 2018, 2019, 2020, 2021],
    },
    chart: {
      id: 'TotalRevenue',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total Revenue',
      data: [],
    },
  ]);

  console.log({ series });

  const [totalRev, setTotalRev] = useState([]);
  const [yrs, setYrs] = useState([]);

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    Axios.get(`${API}/dashboard/total-revenue/`, {
      headers: { Authorization: 'JWT ' + userInfo.userInfo.token },
    })
      .then((res) => {
        var result = res.data.context;
        console.log(
          'check total_revenue',
          result.map((item) => item.total_revenue)
        );
        console.log(
          'let me check years',
          result.map((item) => parseInt(item.year))
        );

        let numbers = [];

        result.map((item) => numbers.push(item.total_revenue));

        setSeries([
          {
            name: 'Total revenue',
            data: numbers,
          },
        ]);
        // setSeries((prev) => {
        //   prev[0].data = result.map((item) => item.total_revenue);

        //   return prev;
        // });
        setOptions((prev) => {
          prev.xaxis.categories = result.map((item) => parseInt(item.year));
          console.log('prev data check', prev);
          return prev;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="400"
    />
  );
};

export default DashboardBarcharts;
