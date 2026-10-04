import { Button, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { Route, withRouter } from "react-router-dom";

const AdminRoute = ({
  component: Component,
  dispatch,
  isAdmin,
  isSuperuser,
  role,
  pageAccessKey,
  allowAll,
  path,
  ...rest
}) => {
  const customRender = () => {
    if (isSuperuser) {
      return true;
    } else if (isAdmin) {
      if (pageAccessKey === "dashboard" || pageAccessKey === "profile") {
        return true;
      } else if (
        role &&
        role.page_list &&
        role.page_list.includes(pageAccessKey, 0)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        customRender() ? (
          <Component {...props} />
        ) : (
          <Modal
            title="Access Denied"
            closable={false}
            visible={true}
            footer={null}
          >
            <p>you dont have access to this page.</p>
            <Row justify="end">
              <Button
                type="primary"
                onClick={() => {
                  props.history.goBack();
                }}
                style={{
                  background: "#FE6D04",
                  borderColor: "#FE6D04",
                }}
              >
                Go Back
              </Button>
            </Row>
          </Modal>
        )
      }
    />
  );
};

export default withRouter(AdminRoute);
