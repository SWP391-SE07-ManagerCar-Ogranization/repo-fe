import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

const handleMenuClick = (e, handleSort) => {
  handleSort();
};

const items = [
  {
    label: "Day",
    key: "1",
  },
];

const DropdownSearch = ({ handleSort }) => {
  const [selectedSort, setSelectedSort] = useState("Sort:type");

  const menuProps = {
    items,
    onClick: (e) => handleMenuClick(e, handleSort),
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button className="h-[45px] mb-1 w-[120px] ">
          <Space>
            {selectedSort}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default DropdownSearch;
