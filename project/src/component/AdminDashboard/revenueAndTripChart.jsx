import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchRevenueInLast12Months, fetchTripInLast12Months } from "../../service/AdminDashboard/TransactionChartData";

const generateLast12MonthsLabels = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const labels = [];

    for (let i = 0; i < 12; i++) {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
        labels.unshift(months[month.getMonth()]);
    }

    return labels;
};

const RevenueTripChart = () => {
    const [revenue, setRevenue] = useState([]);
    const [trip, setTrip] = useState([]);
    const [categories, setCategories] = useState(generateLast12MonthsLabels());

    const getRevenueData = async () => {
        try {
            const data = await fetchRevenueInLast12Months();
            setRevenue(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getTripData = async () => {
        try {
            const data = await fetchTripInLast12Months();
            setTrip(data);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getRevenueData();
        getTripData();
        const interval = setInterval(() => {
            setCategories(generateLast12MonthsLabels());
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);

    const chartConfig = {
        chart: {
            type: 'line',
            height: 400,
        },
        series: [
            {
                name: 'Revenue',
                type: 'bar',
                data: revenue.map((rev, index) => ({ x: categories[index], y: rev }))
            },
            {
                name: 'Trip',
                type: 'bar',
                data: trip.map((tr, index) => ({ x: categories[index], y: tr }))
            }
        ],
        xaxis: {
            categories: categories,
            title: {
                text: 'Month'
            }
        },
        yaxis: [
            {
                title: {
                    text: 'Revenue'
                },
                min: 0,
                forceNiceScale: true,
            },
            {
                opposite: true,
                title: {
                    text: 'Trip'
                },
                min: 0,
                forceNiceScale: true,
            }
        ],
        tooltip: {
            shared: true, // Enable shared tooltip for better visibility of values
            intersect: false, // Set intersect to false for easier hover
            x: {
                show: true,
            },
            y: {
                formatter: (val, { seriesIndex }) => {
                    return seriesIndex === 0 ? `${val} VND` : `${val}`;
                }
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue and Trips in Last 12 Months</h2>
            <ReactApexChart
                options={chartConfig}
                series={chartConfig.series}
                type="line"
                height={chartConfig.chart.height}
            />
        </div>
    );
};

export default RevenueTripChart;
