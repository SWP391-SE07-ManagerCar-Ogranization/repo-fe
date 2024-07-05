import { Button } from "@material-tailwind/react";
import { Breadcrumb, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import { Content } from "antd/es/layout/layout";
import { loadPoint, tradeCouponMinusPoint } from "../../service/CustomerPointService";

function TradePointPage() {
    const [point, setPoint] = useState(0);
    const [change, setChange] = useState(false);

    useEffect(() => {
        fetchPoint();
    }, [change]);

    const fetchPoint = async () => {
        try {
            // const response = await loadPoint();
            // setPoint(response);
            setPoint(300)
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const minusPoint = async (coupon) => {
        try {
          await tradeCouponMinusPoint(coupon);
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
            title: "trade-point",
            key: "/point/trade-point",
        },
    ];

    const CouponCard = ({ coupon, handleTradeCoupon }) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 p-4 border">
                <div className="font-bold text-xl mb-2">{coupon.couponName}</div>
                <p className="text-gray-700 text-base">Value: {coupon.couponValue}</p>
                {coupon.couponValue == 0.1 && <p className="text-orange-400 text-base">100 points</p>}
                {coupon.couponValue == 0.2 && <p className="text-orange-400 text-base">200 points</p>}
                {coupon.couponValue == 0.25 && <p className="text-orange-400 text-base">300 points</p>}
                {((point >= 100 && coupon.couponValue == 0.1)
                    || (point >= 200 && coupon.couponValue == 0.2)
                    || (point >= 300 && coupon.couponValue == 0.25))
                    && (
                        <Button 
                            className="bg-orange-400"
                            onClick={() => handleTradeCoupon(coupon)}
                        >
                            Trade
                        </Button>
                    )}
            </div>
        );
    };

    const CouponList = () => {
        const coupons = [
            {
                couponName: 'Discount 10%',
                couponValue: '0.1',
                couponQuantity: 1,
            },
            {
                couponName: 'Discount 20%',
                couponValue: '0.2',
                couponQuantity: 1,
            },
            {
                couponName: 'Happy trip',
                couponValue: '0.25',
                couponQuantity: 1,
            },
        ];

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
                    >
                    </Breadcrumb>
                    <div>
                        My Point: {point}
                    </div>
                    {coupons.map((coupon, index) => (
                        <CouponCard
                            key={index}
                            coupon={coupon}
                            handleTradeCoupon={handleTradeCoupon}
                        />
                    ))}
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
