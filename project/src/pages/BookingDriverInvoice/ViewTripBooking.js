import React, { useState, useEffect } from "react";
import axios from "axios";
import Rectangle from "../../assets/images/Rectangle.png";
import Group2 from "../../assets/images/Group2.png";
import { getAllInvoices } from "../../service/InvoiceService/ViewTripData";

const trips = [
  {
    name: "Jane Cooper",
    time: "2024-07-06T10:06",
    phone: "(225) 555-0118",
    start: "Đà Nẵng",
    end: "Quảng Nam",
    status: "show map",
  },
  {
    name: "Floyd Miles",
    time: "2024-07-06T10:06",
    phone: "(205) 555-0100",
    start: "Quảng Trị",
    end: "Quảng Nam",
    status: "show map",
  },
  {
    name: "Ronald Richards",
    time: "2024-07-06T10:06",
    phone: "(302) 555-0107",
    start: "Quảng Trị",
    end: "Quảng Nam",
    status: "show map",
  },
  {
    name: "Marvin McKinney",
    time: "2024-07-06T10:06",
    phone: "(252) 555-0126",
    start: "Quảng Nam",
    end: "Iran",
    status: "show map",
  },
];

function ViewTripBooking() {
  const [listInvoice, setListInvoice] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoices = await getAllInvoices();
        setListInvoice(invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  console.log("nxksmkx: ", listInvoice);
  return (
    <div className="flex flex-row bg-gray-100  justify-between">
      <div className="min-h-screen bg-gray-100 p-6 relative">
        <h1 className="text-[80px] mt-[100px] ml-[100px] font-bold text-[#FD7401]">
          FCar
        </h1>
        <div className="fixed top-[100px] right-[100px] w-[1000px] h-[600px] z-30 shadow-lg  bg-white border-[#1E2772] border-[5px] rounded-2xl container mx-auto">
          <div className="bg-white p-4 rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">All View Trips</h1>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Customer Name</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Phone Number</th>
                  <th className="py-2">Start Port</th>
                  <th className="py-2">End Port</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {listInvoice.map((trip, index) => (
                  <tr key={index} className="text-center border-t ">
                    <td className="py-2">{trip.customerName}</td>
                    <td className="py-2">{trip.timeStart}</td>
                    <td className="py-2">{trip.customerPhone}</td>
                    <td className="py-2">{trip.startPoint}</td>
                    <td className="py-2">{trip.endPoint}</td>
                    <td className="py-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded">
                        show map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex-1">
              <div className="mt-4 flex justify-between items-center">
                <p>Page 1 of 40</p>
                <div className="space-x-2">
                  <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    1
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    2
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    3
                  </button>
                  <span className="text-gray-500">...</span>
                  <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    40
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={Group2} className="fixed top-[590px] right-[1020px]" />
      </div>
      <div>
        <img src={Rectangle} className="h-[778px]" />
      </div>
    </div>
  );
}

export default ViewTripBooking;
