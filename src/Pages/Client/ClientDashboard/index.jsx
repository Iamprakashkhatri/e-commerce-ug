import { Card, Row, Col, Typography } from "antd";
import React, { useEffect } from "react";
import Client from "../components/Client";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { listUserOrders } from "../../../actions/orderActions";
import {
  getBillingDetailsAction,
  getShippingDetails,
} from "../../../actions/userActions";

const { Title, Text } = Typography;

const ClientDashboard = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const shipping = useSelector((state) => state.shippingDetails);
  const billingDetail = useSelector(
    (state) => state.billingDetails.billingDetails
  );
  const { shippingDetail } = shipping;
  // const myOrder = useSelector((state) => state.myOrderList);
  // const { userOrders } = myOrder;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUserOrders());
    dispatch(getShippingDetails());
    dispatch(getBillingDetailsAction());
  }, [dispatch]);

  // const columns = [
  //   {
  //     title: "Order UUID",
  //     width: 140,
  //     dataIndex: "id",
  //     key: "number",
  //     fixed: "left",
  //   },
  //   {
  //     title: "Ordered At",
  //     dataIndex: "time_since",
  //     key: "time_since",
  //   },
  //   {
  //     title: "Payment Status",
  //     dataIndex: "payment",
  //     key: "payment",
  //     render: (payment) => {
  //       if (payment === 1) {
  //         return <Badge status="success" text="Paid" />;
  //       } else {
  //         return <Badge status="warning" text="Unpaid" />;
  //       }
  //     },
  //   },
  //   {
  //     title: "Order Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status) => {
  //       if (status === "Ordered") {
  //         return (
  //           <Tag color="warning" icon={<ClockCircleOutlined />}>
  //             {status.toUpperCase()}
  //           </Tag>
  //         );
  //       }
  //       if (status === "Shipping") {
  //         return (
  //           <Tag color="blue" icon={<SyncOutlined spin />}>
  //             {status.toUpperCase()}
  //           </Tag>
  //         );
  //       }
  //       if (status === "Completed") {
  //         return (
  //           <Tag color="green" icon={<CheckCircleOutlined />}>
  //             {status.toUpperCase()}
  //           </Tag>
  //         );
  //       }
  //       if (status === "Cancelled") {
  //         return (
  //           <Tag color="red" icon={<CloseCircleOutlined />}>
  //             {status.toUpperCase()}
  //           </Tag>
  //         );
  //       }
  //     },
  //   },
  //   {
  //     title: "Action",
  //     key: "operation",
  //     fixed: "right",
  //     width: 100,
  //     render: (orders) => {
  //       return (
  //         // <Link to={`/`}>
  //         <Button
  //           type="primary"
  //           style={{ background: "#FE6D04", borderColor: "#FE6D04" }}
  //           icon={<EyeOutlined />}
  //         >
  //           View
  //         </Button>
  //         // </Link>
  //       );
  //     },
  //   },
  // ];
  return (
    <Client>
      <Row style={{ width: "100%" }}>
        <Col xl={9} md={12} sm={24}>
          <Card style={{ height: "100%" }}>
            <Title level={4} style={{ fontSize: "1rem" }}>
              Personal Profile
              <NavLink to="/settings" style={{ marginLeft: ".3rem" }}>
                <EditOutlined color="blue" />
              </NavLink>
            </Title>
            <Text style={{ display: "block" }}>
              Name :-
              {userInfo.user.first_name} {""}
              {userInfo.user.last_name}
            </Text>
            <Text style={{ display: "block" }}>
              Email :-
              {userInfo.user.email}
            </Text>
            <Text style={{ display: "block" }}>
              Phone No. :-
              {userInfo.user.phone_no}
            </Text>
          </Card>
        </Col>
        <Col xl={15} md={12} sm={24}>
          <Card>
            <Title level={4} style={{ fontSize: "1rem" }}>
              Billing Info
              <NavLink to="/settings" style={{ marginLeft: ".3rem" }}>
                <EditOutlined color="blue" />
              </NavLink>
            </Title>
            <Row>
              <Col lg={12}>
                <Text style={{ display: "block" }}>
                  Full Name :- {billingDetail.full_name}
                </Text>
                <Text style={{ display: "block" }}>
                  Address :- {billingDetail.address}
                </Text>
                <Text style={{ display: "block" }}>
                  PAN Number :- {billingDetail.pan_number}
                </Text>
                <Text style={{ display: "block" }}>
                  Province :- {billingDetail.state}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={24}>
          {/* <Title level={4} style={{ fontSize: "1rem", marginTop: "1.5rem" }}>
            Recent Order
          </Title>
          <Table
            style={{ marginTop: "1rem" }}
            columns={columns}
            dataSource={userOrders}
            scroll={{ x: 800 }}
          /> */}
          <Card>
            <Title level={4} style={{ fontSize: "1rem" }}>
              Shipping Address
              <NavLink to="/settings" style={{ marginLeft: ".3rem" }}>
                <EditOutlined color="blue" />
              </NavLink>
            </Title>
            <Row>
              <Col lg={12}>
                <Text style={{ display: "block" }}>
                  Name :- {shippingDetail.full_name}
                </Text>
                <Text style={{ display: "block" }}>
                  Email :- {shippingDetail.email}
                </Text>
                <Text style={{ display: "block" }}>
                  Phone No. :- {shippingDetail.phone_number}
                </Text>
                <Text style={{ display: "block" }}>
                  Company Name :- {shippingDetail.company_name}
                </Text>
              </Col>
              <Col lg={12}>
                <Text style={{ display: "block" }}>
                  Street Address :- {shippingDetail.street_address}
                </Text>
                <Text style={{ display: "block" }}>
                  City :- {shippingDetail.city}
                </Text>
                <Text style={{ display: "block" }}>
                  Province :- {shippingDetail.state}
                </Text>
                <Text style={{ display: "block" }}>
                  Postal Code :- {shippingDetail.postal_code}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Client>
  );
};

export default ClientDashboard;
