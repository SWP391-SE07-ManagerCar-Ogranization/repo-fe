import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  avatar,
} from "@material-tailwind/react";

import { getAllDrivers, updateStatus, deleteDriver } from "../../service/AccountService";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button, Dropdown, Space } from 'antd';

// import {AccountData} from '../../context/accountData'
import RejectDriver from "../../component/AdminManager/RejectDriver";
import avatarDefault from "../../assets/images/avatarDefault.jpg"


export function Driver() {
  const [drivers, setDrivers] = useState([])
  const [driver, setDriver] = useState(null)

  const [activeDrivers, setActiveDrivers] = useState([])
  const [inactiveDrivers, setInactiveDrivers] = useState([])

  // const {theme} = useContext(AccountData)


  useEffect(() => {
    const fetchDrivers = async () => {

      try {
        const data = await getAllDrivers();
        setDrivers(data);
        

      } catch (error) {
        console.error('Error')
      }
    }


    fetchDrivers();
  }, [driver])

  const deleteDriverById = async (id) => {
    try {
     await deleteDriver(id);
    } catch (error) {
     console.error(error);
    }
 }

  const handleUpdateStatus = async (driver) => {
    try {
      await updateStatus(driver?.accountId, null, !driver?.status)
      setDriver(driver)
      // 
    } catch (error) {
      throw error
    }
    // 
  }

  const activeDriverFilter = (list) => {
    return list.filter((driver) => driver?.status)
  }

  const inactiveDriverFilter = (list) => {
    return list.filter((driver) => !driver?.status)
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
            Active Drivers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Drivers", "id_card", "address", "Created_Date", "status", ""].map((el) => (
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
              {activeDriverFilter(drivers).map(
                (driver, key) => {
                  const className = `py-3 px-5 ${key === drivers.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={driver?.accountId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={driver?.image?driver?.image:avatarDefault} alt={driver?.name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {driver?.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {driver?.email}
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
                              {driver?.idCard}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {driver?.address}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          { }
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formatDate(driver?.createdAt)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          key={driver?.accountId}
                          onClick={
                            () => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                  handleUpdateStatus(driver)
                                }
                              });

                            }
                          }
                          variant="gradient"
                          color={driver?.status ? "green" : "blue-gray"}

                          value={driver?.status ? "Active" : "Inactive"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          
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
                                                  confirmButtonText: `Yes, ${driver?.status?'':"UNBAN"} it!`
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    Swal.fire({
                                                      title: `${driver?.status?'Banned':"Unbanned"} !`,
                                                      text: `This cutomer has been ${driver?.status?'BANNED':"UNBANNED"}.`,
                                                      icon: "success"
                                                    });
                                                    handleUpdateStatus(driver)
                                                  }
                                                });
                                
                                              }
                                            } target="_blank" rel="noopener noreferrer" href="">
                                                {driver?.status?'BAN':'UNBAN'}
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <div target="_blank" rel="noopener noreferrer" href="">
                                                DETAIL
                                            </div>
                                        ),
                                    },
                                    
                                ]
                                }}
                                placement="bottomLeft"
                              >
                                <Button onClick={(e)=> e.preventDefault()} className='border-none'><i class="gg-more-alt"></i></Button>
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

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
          Pending Drivers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Drivers", "id_card", "address", "Created_Date", "status", ""].map((el) => (
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
              {inactiveDriverFilter(drivers).map(
                (driver, key) => {
                  const className = `py-3 px-5 ${key === drivers.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={driver?.accountId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={driver?.image?driver?.image:avatarDefault} alt={driver?.name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {driver?.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {driver?.email}
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
                              {driver?.idCard}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {driver?.address}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          { }
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {formatDate(driver?.createdAt)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          key={driver?.accountId}
                          onClick={
                            () => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                  handleUpdateStatus(driver)
                                }
                              });

                            }
                          }
                          variant="gradient"
                          color={driver?.status ? "green" : "blue-gray"}

                          value={driver?.status ? "Active" : "Inactive"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                      </td>
                      <td className={className} >
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
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
                                                  text: `Approve ${driver?.name}?`,
                                                  icon: "warning",
                                                  showCancelButton: true,
                                                  confirmButtonColor: "#3085d6",
                                                  cancelButtonColor: "#d33",
                                                  confirmButtonText: `Yes, ${driver?.status?'':"Approve"}!`
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    Swal.fire({
                                                      title: `${driver?.status?'':"Approved"} !`,
                                                      text: `This cutomer has been ${driver?.status?'':"Approved"}.`,
                                                      icon: "success"
                                                    });
                                                    handleUpdateStatus(driver)
                                                  }
                                                });
                                
                                              }
                                            } target="_blank" rel="noopener noreferrer" href="">
                                                {driver?.status?'BAN':'Approve'}
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <div target="_blank" rel="noopener noreferrer" href="">
                                                DETAIL
                                            </div>
                                        ),
                                    },
                                    {
                                      key: '3',
                                      label: (
                                          <div target="_blank" rel="noopener noreferrer" href=""
                                    
                                          >
                                              <RejectDriver delete={deleteDriverById} driver={driver} title="Reject"/>
                                          </div>
                                      ),
                                  },
                                    
                                ]
                                }}
                                placement="bottomLeft"
                              >
                                <Button onClick={(e) => e.preventDefault()} className='border-none cursor-default'><i class="gg-more-alt"></i></Button>
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

export default Driver;
