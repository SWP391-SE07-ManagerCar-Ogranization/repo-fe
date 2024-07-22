import * as TransactionService from '../../../service/TransactionService'
import * as PaymentService from '../../../service/PaymentService'

export const handleSubmit = async (resrep) => {
    try {
      await TransactionService.addTrans(resrep);
    } catch (error) {
      console.error(error);
    }
  };
export const handlePayment = async (resrep) => {
    try {
      await PaymentService.charge(resrep.amount);
    } catch (error) {
      console.error(error);
    }
  };

