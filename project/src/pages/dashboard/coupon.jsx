import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Alert,
  } from "@material-tailwind/react";
  import React, { useEffect, useState } from "react";
import { addCoupon, couponView, updateCoupon,deleteCoupon } from "../../service/CouponService";
  
  export function Coupons() {
    const [coupons, setCoupons] = useState([]);
    const [change, setChange] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [addingCoupon, setAddingCoupon] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    useEffect(() => {
      fetchCoupons();
    }, [change]);
  
    const fetchCoupons = async () => {
      try {
        const response = await couponView();
        setCoupons(response);
      } catch (error) {
        console.error('Error fetching profile information:', error);
      }
    };
  
    const removeCoupon = async (couponId) => {
      try {
        await deleteCoupon(couponId);
        setChange(!change);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEditClick = (coupon) => {
      setEditingCoupon(coupon);
      setAddingCoupon(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (editingCoupon) {
        setEditingCoupon({ ...editingCoupon, [name]: value });
      } else {
        setAddingCoupon({ ...addingCoupon, [name]: value });
      }
    };
  
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateCoupon(editingCoupon);
        setSuccess('Coupon updated successfully');
        setError('');
        setEditingCoupon(null);
        setChange(!change);
      } catch (error) {
        setError('Error updating coupon');
        setSuccess('');
      }
    };
  
    const handleAddSubmit = async (e) => {
      e.preventDefault();
      try {
        await addCoupon(addingCoupon);
        setSuccess('Coupon added successfully');
        setError('');
        setAddingCoupon(false);
        setChange(!change);
      } catch (error) {
        setError('Error adding coupon');
        setSuccess('');
      }
    };
  
    const handleAddClick = () => {
      setAddingCoupon({ couponName: '', couponValue: '', couponQuantity: '', customerId: '' });
      setEditingCoupon(null);
    };
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              COUPONS
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["coupon name", "coupon value", "quantity", "", ""].map((el) => (
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
                {coupons?.map(
                  ({ couponId, couponName, couponValue, couponQuantity }, key) => {
                    const className = `py-3 px-5 ${
                      key === coupons.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={couponId}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {couponName}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {couponValue}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {couponQuantity}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                            onClick={() => handleEditClick({ couponId, couponName, couponValue, couponQuantity })}
                          >
                            Edit
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            className="text-xs font-semibold text-red-600"
                            onClick={() => removeCoupon(couponId)}
                          >
                            Delete
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
  
        <Button
          variant="gradient"
          color="blue"
          onClick={handleAddClick}
        >
          Add Coupon
        </Button>
  
        {(editingCoupon || addingCoupon) && (
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                {editingCoupon ? 'EDIT COUPON' : 'ADD COUPON'}
              </Typography>
            </CardHeader>
            <CardBody>
              {error && <Alert color="red">{error}</Alert>}
              {success && <Alert color="green">{success}</Alert>}
              <form onSubmit={editingCoupon ? handleEditSubmit : handleAddSubmit} className="flex flex-col gap-6">
                <div>
                  <Input
                    label="Coupon Name"
                    name="couponName"
                    value={editingCoupon ? editingCoupon.couponName : addingCoupon.couponName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="Coupon Value"
                    name="couponValue"
                    value={editingCoupon ? editingCoupon.couponValue : addingCoupon.couponValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="Coupon Quantity"
                    name="couponQuantity"
                    value={editingCoupon ? editingCoupon.couponQuantity : addingCoupon.couponQuantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div>
                  <Input
                    type="number"
                    label="Customer ID"
                    name="customerId"
                    value={editingCoupon ? editingCoupon.customerId : addingCoupon.customerId}
                    onChange={handleInputChange}
                  />
                </div> */}
                <Button type="submit" variant="gradient" color="blue">
                  {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
                </Button>
              </form>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
  
  export default Coupons;
  