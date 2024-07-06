import React, {useContext} from "react";
import {
    Button,
    Collapse,
    Typography
} from 'antd'
import styled from 'styled-components'
import {
    ChatRoomContext
} from '../../context/ChatRoomContext'
import { useNavigate } from 'react-router-dom';

const {Panel} = Collapse

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header, p{
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
    const { theme, setTheme } = useContext(ChatRoomContext)
    const { groupCars, setGroupCars, groupData, setGroupData, userData, setUserData } = theme
    console.log("GROUPPPP>>", groupCars);

    const handleOnClick = (group) => {
        console.log(group);

        setGroupData(group)
        setUserData({
            ...userData,
            groupCarId: group?.groupCarId
        })
    }

    return(
        <>
          <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled
                header="Public Chat"
                key={1}      
            >
                {groupCars?.map((item)=>{

                    return(
                        <LinkStyled onClick={()=>{
                            handleOnClick(item)
                        }}>
                            {item?.groupName}
                        </LinkStyled>
                    )
                })}
               
               
            </PanelStyled>
        </Collapse>
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled
                header="Privte Chat"
                key={1}      
            >
                <LinkStyled>Tom</LinkStyled>
                <LinkStyled>Jerry</LinkStyled>
                <LinkStyled>Quan</LinkStyled>
                <LinkStyled>Kiệt</LinkStyled>
            </PanelStyled>
        </Collapse>
        </>
      
        
    )
}