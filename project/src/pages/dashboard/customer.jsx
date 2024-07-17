import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

import { getAllCustomers, updateStatus } from "../../service/AccountService";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button, Dropdown, Space } from 'antd';
import AccountProfile from "../../component/AdminManager/AccountProfile";
import avatarDefault from "../../assets/images/avatarDefault.jpg"

export function Customer() {
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState(null)

  // const { setTheme } = useContext(AccountData)
  // useEffect(() => {
  //   setTheme((prev) => ({...prev, customers, customer}))
  // },[customer, customers])
  

  let items ;


  useEffect(() => {

    fetchCustomers();
  }, [customer])

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);

    } catch (error) {
    console.error('Error')
    }
  }

  const handleUpdateStatus = async (customer) => {
    try {
      await updateStatus(customer.accountId, null, !customer.status)
      setCustomer(customer)
      //console.log("quan");
    } catch (error) {
      throw error
    }
    //console.log('handleUpdateStatus: ',id, " + " ,status)
  }

  const formatDate = (string) => {
    const date = new Date(string)
    return date.toLocaleString()
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Customers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Customers", "id_card", "address", "Created_Date", "status", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers?.map(
                (customer, key) => {
                  const className = `py-3 px-5 ${key === customers.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={customer.accountId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={customer.image?customer.image:avatarDefault} alt={customer.name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {customer.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {customer.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {customer.idCard}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {customer.address}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {/* {customer.createdAt} */}

                          {formatDate(customer.createdAt)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          key={customer.accountId}
                          // onClick={
                          //   () => {
                          //     Swal.fire({
                          //       title: "Are you sure?",
                          //       text: "You won't be able to revert this!",
                          //       icon: "warning",
                          //       showCancelButton: true,
                          //       confirmButtonColor: "#3085d6",
                          //       cancelButtonColor: "#d33",
                          //       confirmButtonText: "Yes, delete it!"
                          //     }).then((result) => {
                          //       if (result.isConfirmed) {
                          //         Swal.fire({
                          //           title: "Deleted!",
                          //           text: "Your file has been deleted.",
                          //           icon: "success"
                          //         });
                          //         handleUpdateStatus(customer)
                          //       }
                          //     });

                          //   }
                          // }
                          variant="gradient"
                          color={customer.status ? "green" : "blue-gray"}

                          value={customer.status ? "active" : "inactive"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-not-allowed"
                        />
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {/* <EllipsisHorizontalIcon
                            className="mr-4 relative"
                          >
                            
                          </EllipsisHorizontalIcon> */}
                          {/* <DropdownC action={customer.status?'BAN':'UNBAN'} detail='Detail'/> */}

                          
                          

                          <Space direction="vertical">
                            <Space wrap>
                              <Dropdown
                                menu={{
                                   items : [
                                    {
                                        key: '1',
                                        label: (
                                            <div onClick={
                                              () => {
                                                Swal.fire({
                                                  title: "Are you sure?",
                                                  text: "You won't be able to revert this!",
                                                  icon: "warning",
                                                  showCancelButton: true,
                                                  confirmButtonColor: "#3085d6",
                                                  cancelButtonColor: "#d33",
                                                  confirmButtonText: `Yes, ${customer.status?'BAN':"UNBAN"} ${customer.name}!`
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    Swal.fire({
                                                      title: `${customer.status?'Banned':"Unbanned"} !`,
                                                      text: `${customer.name} has been ${customer.status?'BANNED':"UNBANNED"}.`,
                                                      icon: "success"
                                                    });
                                                    handleUpdateStatus(customer)
                                                  }
                                                });
                                
                                              }
                                            } target="_blank" rel="noopener noreferrer" href="">
                                                {customer.status?'BAN':'UNBAN'}
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <div
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              href=""
                                              
                                              >
                                                <AccountProfile customer={customer}/>

                                            </div>
                                        ),
                                    },
                                    
                                ]
                                }}
                                placement="bottomLeft"
                              >
                                <Button onClick={(e) => e.preventDefault()} className='border-none'><i class="gg-more-alt"></i></Button>
                              </Dropdown>

                            </Space>
                          </Space>

                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>


    </div>
  );
}

export default Customer;
