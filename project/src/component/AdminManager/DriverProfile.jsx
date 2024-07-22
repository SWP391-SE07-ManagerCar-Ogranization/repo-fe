import { React, useState } from 'react';
import { Button, Modal } from 'antd';
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Chip,

} from "@material-tailwind/react";
const DriverProfile = (props) => {


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showLoading = (props) => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <div type="primary" onClick={showLoading}>
        Detail
      </div>
      <Modal
        title={<p>Profile</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >

        <Card>
          <CardBody>
            <div className="mb-10 items-center justify-between gap-6">
              <div className="mb-10 flex items-center gap-6">
                <Avatar
                  src={props?.driver?.image}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {props?.driver?.name}
                    <div className='flex'>
                      <Chip
                        variant="gradient"
                        color={"yellow"}
                        value={"Rating"}
                        className="mr-1 py-0.5 px-2 text-[10px] font-medium w-fit cursor-pointer"
                      >

                      </Chip>
                      {props?.driver?.driverDetail?.rating.toFixed(1)}
                      <span className="text-orange-400">☆</span>
                    </div>



                  </Typography>

                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {props?.driver?.email}
                  </Typography>
                </div>


              </div>


              <div className='mt-4'>

                <div className="">
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 flex gap-4 flex-wrap">
                      <div className='flex w-full'>
                        <Chip
                          variant="gradient"
                          color={"blue"}
                          value={"Name"}
                          className="mr-1 py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                        <Typography variant="" color="blue-gray" className="mb-1 text-[0.75rem] font-extrabold">
                          {props?.driver?.name}
                        </Typography>
                      </div>
                      <div className='flex w-full'>
                        <Chip
                          variant="gradient"
                          color={"blue"}
                          value={"Phone"}
                          className="mr-1 py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                        <Typography variant="" color="blue-gray" className="mb-1 text-[0.75rem] font-extrabold">
                          {props?.driver?.phone}
                        </Typography>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex gap-4 flex-wrap">
                      <div className='flex w-full'>
                        <Chip
                          variant="gradient"
                          color={"blue"}
                          value={"DOB"}
                          className="mr-1 py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                        <Typography variant="" color="blue-gray" className="mb-1 text-[0.75rem] font-extrabold">
                          {props?.driver?.dob}
                        </Typography>
                      </div>
                      <div className='flex w-full'>
                        <Chip
                          variant="gradient"
                          color={"blue"}
                          value={"Address"}
                          className="mr-1 py-0.5 px-2 text-[11px] font-medium w-fit cursor-pointer"
                        />
                        <Typography variant="" color="blue-gray" className="mb-1 text-[0.75rem] font-extrabold">
                          {props?.driver?.address}
                        </Typography>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
          </CardBody>
        </Card>

      </Modal>
    </>
  );
};
export default DriverProfile;