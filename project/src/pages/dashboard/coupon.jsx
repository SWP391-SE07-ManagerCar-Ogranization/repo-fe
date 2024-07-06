import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Alert,
    Select,
    Option,
  } from "@material-tailwind/react";
  import React, { useEffect, useState } from "react";
  import Swal from "sweetalert2";
  import { addCoupon, couponView, updateCoupon, deleteCoupon } from "../../service/CouponService";
  
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
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
  
        if (result.isConfirmed) {
            try {
                await deleteCoupon(couponId);
                setChange(!change);
                Swal.fire('Deleted!', 'Your coupon has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'Error deleting coupon.', 'error');
                console.error(error);
            }
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
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this coupon?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });
  
        if (result.isConfirmed) {
            try {
                await updateCoupon(editingCoupon);
                setSuccess('Coupon updated successfully');
                setError('');
                setEditingCoupon(null);
                setChange(!change);
                Swal.fire('Updated!', 'Your coupon has been updated.', 'success');
            } catch (error) {
                setError('Error updating coupon');
                setSuccess('');
                Swal.fire('Error!', 'Error updating coupon.', 'error');
            }
        }
    };
  
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to add this coupon?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        });
  
        if (result.isConfirmed) {
            try {
                await addCoupon(addingCoupon);
                setSuccess('Coupon added successfully');
                setError('');
                setAddingCoupon(false);
                setChange(!change);
                Swal.fire('Added!', 'Your coupon has been added.', 'success');
            } catch (error) {
                setError('Error adding coupon');
                setSuccess('');
                Swal.fire('Error!', 'Error adding coupon.', 'error');
            }
        }
    };
  
    const handleAddClick = () => {
        setAddingCoupon({ couponName: '', couponValue: '', couponQuantity: '', couponType: '' });
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
                                {["coupon name", "coupon value", "quantity", "type", "", ""].map((el) => (
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
                                ({ couponId, couponName, couponValue, couponQuantity, couponType }, key) => {
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
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {couponType}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                    onClick={() => handleEditClick({ couponId, couponName, couponValue, couponQuantity, couponType })}
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
                            <div>
                                <Select
                                    label="Coupon Type"
                                    name="couponType"
                                    value={editingCoupon ? editingCoupon.couponType : addingCoupon.couponType}
                                    onChange={(e) => handleInputChange({ target: { name: 'couponType', value: e } })}
                                    required
                                >
                                    <Option value="Free coupon">Free coupon</Option>
                                    <Option value="Trade coupon">Trade coupon</Option>
                                </Select>
                            </div>
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
  