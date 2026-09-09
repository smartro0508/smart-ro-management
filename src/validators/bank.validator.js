import { AppError } from '../utils/apiResponse.js';

export const validateBank = (req, res, next) => {
  const { accountholder, bankname, accountnumber, ifsccode, branch } = req.body;
  const errors = {};

  if (!accountholder) errors.accountholder = 'Account holder name is required';
  if (!bankname) errors.bankname = 'Bank name is required';
  if (!accountnumber) errors.accountnumber = 'Account number is required';
  if (!ifsccode) errors.ifsccode = 'IFSC code is required';
  if (!branch) errors.branch = 'Branch is required';

  if (Object.keys(errors).length > 0) {
    const error = new AppError('Validation failed', 400);
    error.validationErrors = errors;
    return next(error);
  }

  next();
};
