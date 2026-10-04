import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;
const Contactfaq = (props) => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIconPosition={"right"}
    >
      <Panel
        header={
          <Text style={{ color: "#000", fontSize: "18px" }}>
            {props.question}
          </Text>
        }
        key={props.id}
      >
        <Text style={{ color: "#000", fontSize: "16px" }}>{props.answer}</Text>
      </Panel>
    </Collapse>
  );
};

export default Contactfaq;
