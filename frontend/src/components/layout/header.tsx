import React from "react";
import { useNavigate } from "react-router-dom";
import CurrentUser from "./current-user";
import { Layout, Space } from "antd";
import { QrcodeOutlined } from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();

  const headerStyles: React.CSSProperties = {
    background: "#9A031E",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  const iconStyles: React.CSSProperties = {
    fontSize: "30px",
    cursor: "pointer",
    backgroundColor:'white',
    borderRadius:'5px',
    marginTop:'20px'
  };

  const handleIconClick = () => {
    navigate("/escaner");
  };

  return (
    <>
      <Layout.Header style={headerStyles}>
        <Space align="center" size="middle">
          <QrcodeOutlined style={iconStyles} onClick={handleIconClick} />
          <CurrentUser />
        </Space>
      </Layout.Header>
    </>
  );
};

export default Header;
