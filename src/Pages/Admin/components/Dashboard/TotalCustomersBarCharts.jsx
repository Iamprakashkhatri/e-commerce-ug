import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { API } from '../../../../config';
import Axios from 'axios';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const TotalCustomersBarCharts = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const [totalCustomers, setTotalCustomers] = useState([]);
  const [yrs, setYrs] = useState([]);

  const data = {
    options: {
      chart: {
        id: 'TotalCustomers',
      },
      xaxis: {
        categories: yrs,
      },
    },
    series: [
      {
        name: 'Total Customers',
        data: totalCustomers,
      },
    ],
  };

  useEffect(() => {
    Axios.get(`${API}/dashboard/total-customer/`, {
      headers: { Authorization: 'JWT ' + userInfo.userInfo.token },
    })
      .then((res) => {
        console.log('check check check', res);

        let years = [];
        let customers = [];

        for (const dataObj of res.data.context) {
          years.push(parseInt(dataObj.year));
          customers.push(dataObj.total_customer);
        }

        setYrs(years);
        setTotalCustomers(customers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Chart {...data} type="bar" width="100%" height="400" />;
};

export default TotalCustomersBarCharts;
