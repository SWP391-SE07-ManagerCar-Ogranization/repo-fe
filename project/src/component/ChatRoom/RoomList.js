import React from "react";
import {
    Collapse,
    Typography
} from 'antd'
import styled from 'styled-components'

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
    return(
        <>
          <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled
                header="Public Chat"
                key={1}      
            >
                <LinkStyled>Room1</LinkStyled>
                <LinkStyled>Room1</LinkStyled>
                <LinkStyled>Room1</LinkStyled>
                <LinkStyled>Room1</LinkStyled>
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