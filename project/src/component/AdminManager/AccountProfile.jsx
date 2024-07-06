import { React, useState, useContext } from 'react';
import { Button, Modal } from 'antd';
import {
  Card,
  CardBody,
  Avatar,
  Typography,
 
} from "@material-tailwind/react";
const AccountProfile = (props) => {


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showLoading = (props) => {
    setOpen(true);
    setLoading(true);
    const titlep = props.title

    // Simple loading mock. You should add cleanup logic in real world.
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
              <div className="flex items-center gap-6">
                <Avatar
                  src={props.customer.image}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {props.customer.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {props.customer.email}
                  </Typography>
                </div>


              </div>
              <div className='mt-4'>
               
                    <div className="">
                      <div className="">
                        <div>
                          <Typography variant="" color="blue-gray" className="mb-1 text-[0.75rem] font-extrabold">
                            {props.customer.name}
                          </Typography>
                        
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
export default AccountProfile;