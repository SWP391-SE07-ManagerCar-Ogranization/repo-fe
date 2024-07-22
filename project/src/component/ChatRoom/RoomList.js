import React, { useContext } from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { ChatRoomContext } from "../../context/ChatRoomContext";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ChatRoomContext);
  const {
    groupCars,
    setGroupCars,
    groupData,
    setGroupData,
    userData,
    setUserData,
    setDriverDetail,
    privateChats,
    setPrivateChats,
    role,
  } = theme;

  console.log("ROLEEEEEEEEEEEEEEEEEEEEEE", role);

  const handleOnClick = (group) => {
    setGroupData(group);
    setUserData((prev) => ({
      ...prev,
      groupCarId: group?.groupId,
      type: "PUBLIC",
    }));
  };

  return (
    <Collapse className="" ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Public Chat" key={1}>
        {groupCars?.map((item, index) => {
          let className = `flex-1 w-[130%] relative p-1`;
          if (userData?.type != "PRIVATE") {
            className = `flex-1 w-[130%] relative p-1 ${
              item?.groupId == userData?.groupCarId
                ? " rounded-lg font-bold bg-white z-20"
                : ""
            }`;
          }

          return (
            <LinkStyled
              style={{color: "black"}}
              key={index}
              onClick={() => {
                handleOnClick(item);
              }}
              className={className}
            >
              {`GroupCar-${item?.groupId}`}
            </LinkStyled>
          );
        })}
      </PanelStyled>
    </Collapse>
  );
}
