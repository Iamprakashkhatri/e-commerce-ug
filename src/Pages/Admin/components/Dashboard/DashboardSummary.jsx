import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../../../config';
import Axios from 'axios';
import { getDashboardCalculateTotal } from '../../../../actions/adminActions';

import {
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Dashboardcard, Cardicon, Cardcolor } from './styles/dashboard';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

function DashboardSummary() {
  const dashboardCountTotal = useSelector(
    (state) => state.dashboardCalculateTotal.calculateTotalData.context
  );

  console.log({ dashboardCountTotal });

  console.log('dashboard calculate total', dashboardCountTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardCalculateTotal());
  }, [dispatch]);

  return (
    <>
      <Row
        gutter={[24, 24]}
        justify="space-between"
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '8px 38px',
        }}
      >
        <Col xs={12} sm={12} md={6} lg={8}>
          <Dashboardcard>
            <Row gutter={[0, 10]} justify="space-between" align="middle">
              <Col>
                <Title
                  style={{
                    fontWeight: 'normal',
                    color: '#000',
                    marginBottom: '.5em',
                  }}
                  level={5}
                >
                  TOTAL PRODUCTS
                </Title>
                <Text style={{ fontWeight: 600 }}>
                  {' '}
                  {dashboardCountTotal !== undefined &&
                    dashboardCountTotal.length > 0 &&
                    dashboardCountTotal.map((item) => item.total_products)}{' '}
                </Text>
              </Col>
              <Col>
                <Cardicon
                  style={{
                    background: '#5ace99',
                  }}
                >
                  <RiseOutlined style={{ fontSize: '2em' }} />
                </Cardicon>
              </Col>
            </Row>
            {/* <Text style={{ fontSize: '.8rem' }}>
              <Cardcolor>+3.48%</Cardcolor>
              Since last Day
            </Text> */}
          </Dashboardcard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={8}>
          <Dashboardcard>
            <Row gutter={[0, 10]} align="middle" justify="space-between">
              <Col xs={12} sm={6} md={6} lg={6}>
                <Title
                  style={{
                    fontWeight: 'normal',
                    color: '#000',
                    marginBottom: '.5em',
                  }}
                  level={5}
                >
                  TOTAL SALES
                </Title>
                <Text style={{ fontWeight: 600 }}>
                  {' '}
                  {dashboardCountTotal !== undefined &&
                    dashboardCountTotal.length > 0 &&
                    dashboardCountTotal.map((item) => item.total_sell)}{' '}
                </Text>
              </Col>
              <Col>
                <Cardicon
                  style={{
                    background: '#f14a56',
                  }}
                >
                  <FallOutlined style={{ fontSize: '2em' }} />
                </Cardicon>
              </Col>
            </Row>
            {/* <Text style={{ fontSize: '.8rem' }}>
              <Cardcolor>+4.68%</Cardcolor>
              Since last Day
            </Text> */}
          </Dashboardcard>
        </Col>
        <Col xs={12} sm={12} md={6} lg={8}>
          <Dashboardcard>
            <Row gutter={[0, 10]} align="middle" justify="space-between">
              <Col>
                <Title
                  style={{
                    fontWeight: 'normal',
                    color: '#000',
                    marginBottom: '.5em',
                  }}
                  level={5}
                >
                  TOTAL REVENUE
                </Title>
                <Text style={{ fontWeight: 600 }}>
                  {' '}
                  {dashboardCountTotal !== undefined &&
                    dashboardCountTotal.length > 0 &&
                    dashboardCountTotal.map((item) => item.total_revenue)}{' '}
                </Text>
              </Col>
              <Col>
                <Cardicon
                  style={{
                    background: '#7964e5',
                  }}
                >
                  <DollarOutlined style={{ fontSize: '2em' }} />
                </Cardicon>
              </Col>
            </Row>
            {/* <Text style={{ fontSize: '.8rem' }}>
              <Cardcolor>+13.48%</Cardcolor>
              Since last Day
            </Text> */}
          </Dashboardcard>
        </Col>
      </Row>
    </>
  );
}

export default DashboardSummary;
