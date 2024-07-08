import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import * as PaymentService from '../../service/PaymentService'
import { useFormik } from "formik";
import * as UserService from "../../service/UserService";

const SystemCharge = (props) => {
  const [error, setError] = useState("");
  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const reChargeInfo = {
    amount: "",
    message: "Recharge into wallet"
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: reChargeInfo,
    onSubmit: async (values) => {
      try {
          setLoading(true);
          const stripePath = await PaymentService.charge(profileInfo, values.amount, values.message);
          window.location.href = stripePath;
      } catch (error) {
        setLoading(false);
        setError("Not valid Input amount");
      }
    },
  });

  return (
      <div id="system-charge" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Your Money To Wallet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="number"
              value={values.amount}
              name="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Amount Cost"
            />
          </div>
          {error && (
              <p className="mt-2 text-sm text-red -600 dark:text-red-500 text-center font-semibold">
                {error}
              </p>
            )}
              <Button fullWidth
            type="submit"
            size="lg"
            className=" bg-blue-500 text-white py-2"
            loading={loading} 
          >
            {loading ? ("Waiting..." ): ("Pay")}
          </Button>
        </form>
      </div>
  );
};

export default SystemCharge;
