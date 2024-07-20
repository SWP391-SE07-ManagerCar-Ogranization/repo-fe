import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Rectangle from "../../assets/images/Rectangle.png";
import Group2 from "../../assets/images/Group2.png";
import {
  getInvoiceByCustomer,
  getAccountById,
  searchInvoices,
  sortInvoicesByDate,
} from "../../service/InvoiceService/ViewTripData";
import Tooltip from "./Tooltip";
import * as UserService from "../../service/UserService";
import { Button, Input, Space } from "antd";
import DropdownSearch from "./DropDownSearch";

const { Search } = Input;

function ViewTripBooking() {
  const [userId, setUserId] = useState(null);
  const [listInvoice, setListInvoice] = useState([]);
  const [accountInfo, setAccountInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await UserService.getYourProfile(token);
        setUser(response.account);
      } else {
        console.error("No token found in local storage");
      }
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }
      try {
        const invoices = await getInvoiceByCustomer(token);
        setListInvoice(invoices);
        setResults(invoices);

        const accountData = {};
        const accountPromises = invoices.map(async (invoice) => {
          if (invoice.userTransaction?.transactionId) {
            const accountId = user.accountId;
            console.log(" user.accountId 111111", accountId);

            if (accountId && !accountData[accountId]) {
              try {
                const account = await getAccountById(accountId);
                accountData[accountId] = account;
              } catch (accountError) {
                console.error(
                  `Error fetching account with ID ${accountId}:`,
                  accountError
                );
              }
            }
          }
        });
        await Promise.all(accountPromises);
        setAccountInfo(accountData);
      } catch (invoiceError) {
        if (invoiceError.response && invoiceError.response.status === 403) {
          console.error("Access forbidden: Invalid or expired token");
        } else {
          console.error("Error fetching invoices:", invoiceError);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSort = async () => {
    const token = localStorage.getItem("token");
    try {
      const sortedInvoices = await sortInvoicesByDate(token);
      setResults(sortedInvoices);
    } catch (error) {
      console.error("Error sorting invoices:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfileInfo();
      await fetchInvoices();
    };
    fetchData();
  }, [user.accountId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await searchInvoices(searchTerm, token);
      console.log("Search Results:", response);
      setResults(response);
    } catch (error) {
      console.error("Error searching invoices:", error);
    }
  };

  return (
    <div className="flex flex-row bg-gray-100 justify-between">
      <div className="min-h-screen bg-gray-100 p-6 relative">
        <h1 className="text-[80px] mt-[100px] ml-[100px] font-bold text-[#FD7401]">
          FCar
        </h1>
        <div className="fixed top-[100px] right-[100px] w-[1000px] h-[600px] z-30 shadow-lg bg-white border-[#1E2772] border-[5px] rounded-2xl container mx-auto">
          <div className="bg-white p-4 rounded-2xl flex flex-col">
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">All View Trips</h1>
                <div className="flex flex-row gap-5">
                  <Space.Compact className="ml-[20px] flex justify-end">
                    <Button
                      icon={<CiSearch size={"24px"} />}
                      onClick={handleSearch}
                      style={{
                        width: "50px",
                        height: "100%",
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                    <Input
                      style={{
                        height: "100%",
                        width: "240px",
                      }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search"
                    />
                  </Space.Compact>
                  <DropdownSearch handleSort={handleSort} />
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Customer Name</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Phone Number</th>
                    <th className="py-2">Start Port</th>
                    <th className="py-2">End Port</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Feedback</th>
                  </tr>
                </thead>
                <tbody className="">
                  {currentItems.length > 0 ? (
                    currentItems.map((trip, index) => {
                      const accountId = user.accountId;
                      const account = accountInfo[accountId];
                      return (
                        <tr
                          key={index}
                          className="text-center border-t h-[80px]"
                        >
                          <td className="py-2 cursor-pointer">
                            {account?.name || "Kiet"}
                          </td>
                          <td className="py-2 cursor-pointer">
                            {formatDateTime(trip.timeStart)}
                          </td>
                          <td className="py-2 cursor-pointer">
                            {account?.phone}
                          </td>
                          <td className="py-2">
                            <Tooltip text={trip.startPoint}>
                              <div className="truncate max-w-[150px]">
                                {trip.startPoint}
                              </div>
                            </Tooltip>
                          </td>
                          <td className="py-2">
                            <Tooltip text={trip.endPoint}>
                              <div className="truncate max-w-[150px]">
                                {trip.endPoint}
                              </div>
                            </Tooltip>
                          </td>
                          <td className="py-2">
                            <button
                              className={`px-4 py-2 rounded-3xl w-[100px] h-[40px] border-[1px] flex justify-center  ${
                                trip.finish.toString() === "true"
                                  ? "bg-green-500 hover:bg-green-600 border-green-300"
                                  : "bg-orange-500 hover:bg-orange-600 border-orange-300"
                              } text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
                            >
                              {trip.finish.toString() === "true"
                                ? "Completed"
                                : "Incomplete"}
                            </button>
                          </td>
                          <td className="py-2 w-[100px] h-[40px] shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            <button className="bg-gray-600 text-white px-4 py-2 rounded">
                              Feedback
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No trips available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-end">
              <div className="flex-1 ">
                <div className="mt-4 flex justify-between items-center">
                  <p>
                    Page {currentPage} of{" "}
                    {Math.ceil(results.length / itemsPerPage)}
                  </p>
                  <div className="space-x-2">
                    {[
                      ...Array(Math.ceil(results.length / itemsPerPage)).keys(),
                    ].map((number) => (
                      <button
                        key={number + 1}
                        className={`bg-gray-200 text-gray-800 px-2 py-1 rounded ${
                          currentPage === number + 1
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={Group2}
          className="fixed top-[590px] right-[1020px]"
          alt="Group2"
        />
      </div>
      <div>
        <img src={Rectangle} className="h-[778px]" alt="Rectangle" />
      </div>
    </div>
  );
}

export default ViewTripBooking;
