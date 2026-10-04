import {
  Col,
  Row,
  Space,
  Card,
  Divider,
  Table,
  Tooltip,
  Typography,
} from "antd";
import Moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userOrderDetailsAction } from "../../../actions/orderActions";
import Client from "../components/Client";

const { Text, Title } = Typography;

const ClientOrderDetails = ({ match }) => {
  const id = match.params.id;
  const details = useSelector(
    (state) => state.userOrderDetails.userOrderDetails
  );
  const loading = useSelector((state) => state.userOrderDetails.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrderDetailsAction(id));
  }, [dispatch, id]);

  console.log("details data check check", details);

  const columns = [
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
      render: (item, index) => (
        <Tooltip title={item} key={index}>
          {item}
        </Tooltip>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "final_price",
      key: "final_price",
      render: (item, index) => (
        <Tooltip title={Number(item).toLocaleString("en-IN")} key={index}>
          NPR {Number(item).toLocaleString("en-IN")}
        </Tooltip>
      ),
    },
    {
      title: "Total",
      dataIndex: "final_price",
      key: "final_price",
      render: (item, index) => (
        <Tooltip title={Number(item).toLocaleString("en-IN")} key={index}>
          NPR {Number(item).toLocaleString("en-IN")}
        </Tooltip>
      ),
    },
  ];

  const column1 = [
    {
      title: "Order Details",
      dataIndex: "order_uuid",
      key: "order_uuid",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <Client>
      <Row gutter={[0, 48]} style={{ width: "100%" }}>
        <Col xl={24} md={12} sm={24}>
          <Card title="Order Details">
            <Row>
              <Col lg={12}>
                <Text style={{ display: "block" }}>
                  <b> Order ID : </b>
                  {details.id}
                </Text>
                <Text style={{ display: "block" }}>
                  <b>Date Added :</b>
                  {Moment(details.time_created).format("DD-MM-YYYY")}
                </Text>
                <Text style={{ display: "block" }}>
                  <b>Payment Method :</b>
                  {details.billing !== undefined &&
                    details.billing.method_of_payment}
                </Text>
              </Col>
              <Col lg={10}>
                <Text>
                  <b>Email: </b> {details.email}
                </Text>{" "}
                <br />
                <Text>
                  <b>Phone: </b> {details.phone_number}
                </Text>
                <br />
                <Text>
                  <b>Order Status:</b> {details.status}
                </Text>
                <br />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Card title="Shipping Address">
            {details.billing !== undefined && details.street_address}
          </Card>
        </Col>
        <Col xs={24}>
          <Table
            style={{ marginTop: "2rem", width: "100%" }}
            columns={columns}
            dataSource={details !== undefined && details.products}
            loading={loading}
          />
        </Col>
      </Row>
    </Client>
  );
};

export default ClientOrderDetails;
