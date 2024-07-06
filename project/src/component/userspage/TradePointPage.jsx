import { Button } from "@material-tailwind/react";
import { Breadcrumb, Card, Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import { Content } from "antd/es/layout/layout";
import { loadPoint, tradeCouponMinusPoint } from "../../service/CustomerPointService";
import { myCoupon, tradeCouponView } from "../../service/CouponService";

function TradePointPage() {
    const [point, setPoint] = useState(0);
    const [change, setChange] = useState(false);
    const [myCoupons, setMyCoupons] = useState([]);
    const [tradeCoupons, setTradeCoupons] = useState([])

    useEffect(() => {
        fetchMyCoupons();
        fetchPoint();
        fetchTradeCoupons();
    }, [change]);

    const fetchMyCoupons = async () => {
        try {
            const response = await myCoupon(localStorage.getItem('token'));
            setMyCoupons(response);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const fetchTradeCoupons = async () => {
        try {
            const response = await tradeCouponView();
            setTradeCoupons(response);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const fetchPoint = async () => {
        try {
            const response = await loadPoint(localStorage.getItem('token'));
            console.log("point" + response);
            setPoint(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const minusPoint = async (coupon) => {
        try {
            await tradeCouponMinusPoint(coupon, localStorage.getItem('token'));
            setChange(!change);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleTradeCoupon = async (coupon) => {
        try {
            console.log(`Trading coupon: `, coupon);
            minusPoint(coupon);
            console.log(coupon, "success");
        } catch (error) {
            console.error('Error getting coupon:', error);
        }
    };

    const breadcrumbItems = [
        {
            title: <Link to={"/"}>Home</Link>,
            key: "/",
        },
        {
            title: <Link to={"/profile"}>Profile</Link>,
            key: "/profile",
        },
        {
            title: "Coupon",
            key: "/point/trade-point",
        },
    ];

    const CouponCard = ({ coupon, handleTradeCoupon }) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 p-4 border">
                <div className="font-bold text-xl mb-2">{coupon.couponName}</div>
                <p className="text-gray-700 text-base">Value: {coupon.couponValue}</p>
                <p className="text-orange-400 text-base">{coupon.couponValue*1000} points</p>
                {(point >= coupon.couponValue*1000)? 
                    (
                        <Button
                            className="bg-orange-400"
                            onClick={() => handleTradeCoupon(coupon)}
                        >
                            Trade
                        </Button>
                    ):
                    (
                        <Button
                            className="bg-orange-400"
                            disabled
                        >
                            Trade
                        </Button>
                    )
                    }
            </div>
        );
    };

    const CouponList = () => {
        // const coupons = [
        //     {
        //         couponName: 'Discount 10%',
        //         couponValue: '0.1',
        //         couponQuantity: 1,
        //     },
        //     {
        //         couponName: 'Discount 20%',
        //         couponValue: '0.2',
        //         couponQuantity: 1,
        //     },
        //     {
        //         couponName: 'Happy trip',
        //         couponValue: '0.25',
        //         couponQuantity: 1,
        //     },
        // ];

        return (
            <Layout>
                <Header />
                <Content style={{
                    padding: "0 48px",
                }}>
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                        items={breadcrumbItems}
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                        <Card className="flex-1 p-4 bg-white rounded-lg shadow-md">
                            <div className="p-4 bg-orange-400 rounded-lg mb-4 text-center">
                                <Typography className="text-xl font-semibold text-white">
                                    My Point: {point}
                                </Typography>
                            </div>
                            <table className="w-full min-w-[250px] table-auto">
                                <tbody>
                                    {myCoupons?.map((coupon, key) => {
                                        const className = `py-3 px-5 ${key === myCoupons.length - 1 ? "" : "border-b border-blue-gray-200"}`;

                                        return (
                                            <tr key={coupon.couponId} className="hover:bg-blue-gray-50">
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <Typography className="text-sm font-medium text-blue-gray-800">
                                                                {coupon.couponName}
                                                            </Typography>
                                                            <Typography className="text-xs font-light text-blue-gray-500">
                                                                Quantity: {coupon.couponQuantity}
                                                            </Typography>
                                                            <Typography className="text-xs font-light text-blue-gray-500">
                                                                Value: {coupon.couponValue * 100}%
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                        <Card className="flex-1 p-4 bg-white rounded-lg shadow-md">
                            {tradeCoupons.map((coupon, index) => (
                                <CouponCard
                                    key={index}
                                    coupon={coupon}
                                    handleTradeCoupon={handleTradeCoupon}
                                />
                            ))}
                        </Card>
                    </div>
                </Content>
            </Layout>
        );
    };

    return (
        <div>
            <CouponList />
        </div>
    );
}

export default TradePointPage;
