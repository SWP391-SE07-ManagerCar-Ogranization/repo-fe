import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Card, Layout, Table, Space, Tabs, Spin, Alert } from "antd";
import Header from "../../layouts/Header";
import { Content } from "antd/es/layout/layout";
import { loadPoint, tradeCouponMinusPoint } from "../../service/CustomerPointService";
import { getMyTradeCoupon, myCoupon, tradeCouponView } from "../../service/CouponService";

const { Column } = Table;
const { TabPane } = Tabs;

function TradePointPage() {
    const [point, setPoint] = useState(0);
    const [change, setChange] = useState(false);
    const [myCoupons, setMyCoupons] = useState([]);
    const [tradeCoupons, setTradeCoupons] = useState([]);
    const [tradeCouponHistory, setTradeCouponHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchMyCoupons(), fetchPoint(), fetchTradeCoupons(), fetchMyTradeCoupon()])
            .then(() => setLoading(false))
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    }, [change]);

    const fetchMyTradeCoupon = async () => {
        try {
            const response = await getMyTradeCoupon(localStorage.getItem('token'));
            const sortedHistory = response.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate));
            setTradeCouponHistory(sortedHistory);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setError(error.message);
        }
    };

    const fetchMyCoupons = async () => {
        try {
            const response = await myCoupon(localStorage.getItem('token'));
            const sortedCoupons = response.sort((a, b) => b.couponValue - a.couponValue);
            setMyCoupons(sortedCoupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setError(error.message);
        }
    };

    const fetchTradeCoupons = async () => {
        try {
            const response = await tradeCouponView();
            const sortedTradeCoupons = response.sort((a, b) => b.couponValue - a.couponValue);
            setTradeCoupons(sortedTradeCoupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setError(error.message);
        }
    };

    const fetchPoint = async () => {
        try {
            const response = await loadPoint(localStorage.getItem('token'));
            console.log("point" + response);
            setPoint(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
            setError(error.message);
        }
    };

    const minusPoint = async (coupon) => {
        try {
            await tradeCouponMinusPoint(coupon, localStorage.getItem('token'));
            setChange(!change);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setError(error.message);
        }
    };

    const handleTradeCoupon = async (coupon) => {
        try {
            console.log(`Trading coupon: `, coupon);

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to trade this coupon: ${coupon.couponName}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, trade it!'
            });

            if (result.isConfirmed) {
                await minusPoint(coupon);
                console.log(coupon, "success");
                Swal.fire('Traded!', 'You have successfully traded the coupon.', 'success');
            }
        } catch (error) {
            console.error('Error trading coupon:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Header />
                <Content style={{ padding: "0 48px", marginTop: 16 }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Header />
                <Content style={{ padding: "0 48px", marginTop: 16 }}>
                    <Alert message="Error" description={error} type="error" showIcon />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout>
            <Header />
            <Content style={{ padding: "0 48px" }}>

                <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
                    <TabPane tab="My Coupons" key="1">
                        <Card className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-start">
                                <p className="mb-3 font-bold text-26 text-orange-400">MY POINT: {point}</p>
                            </div>
                            <Table dataSource={myCoupons} rowKey="couponId" pagination={{ pageSize: 5 }}>
                                <Column title="Name" dataIndex="couponName" key="couponName" />
                                <Column title="Quantity" dataIndex="couponQuantity" key="couponQuantity" />
                                <Column title="Value" dataIndex="couponValue" key="couponValue" render={value => `${value * 100}%`} />
                            </Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="Available Coupons" key="2">
                        <Card className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-start">
                            <p className="mb-3 font-bold text-26 text-orange-400">MY POINT: {point}</p>
                            </div>
                            <Table dataSource={tradeCoupons} rowKey="couponId" pagination={{ pageSize: 5 }}>
                                <Column
                                    title="Name"
                                    dataIndex="couponName"
                                    key="couponName"
                                    render={(text, record) => (
                                        <Space size="middle">
                                            <span>{text}</span>
                                        </Space>
                                    )}
                                />
                                <Column title="Value" dataIndex="couponValue" key="couponValue" render={value => `${value} %`} />
                                <Column title="Points" dataIndex="couponValue" key="couponPoints" render={value => `${value * 1000} points`} />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => (
                                        <Button
                                            className="bg-orange-400"
                                            onClick={() => handleTradeCoupon(record)}
                                            disabled={point < record.couponValue * 1000}
                                        >
                                            Trade
                                        </Button>
                                    )}
                                />
                            </Table>
                        </Card>
                    </TabPane>
                    <TabPane tab="Trade History" key="3">
                        <Card className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-start">
                            <p className="mb-3 font-bold text-26 text-orange-400">MY POINT: {point}</p>
                            </div>
                            <Table dataSource={tradeCouponHistory} rowKey="id" pagination={{ pageSize: 5 }}>
                                <Column title="Name" dataIndex="couponName" key="couponName" />
                                <Column title="Value" dataIndex="couponValue" key="couponValue" render={value => `${value * 100} %`} />
                                <Column title="Traded On" dataIndex="takenDate" key="takenDate" render={date => new Date(date).toLocaleDateString()} />
                                <Column title="Points Used" dataIndex="couponValue" key="pointsUsed" render={(value, record) => (
                                    <span className="text-red-500">
                                        {`- ${value * 1000} points`} {`(${record.couponQuantity})`}
                                    </span>
                                )} />
                            </Table>
                        </Card>
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    );
}

export default TradePointPage;