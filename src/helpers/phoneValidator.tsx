const validatePhone = (phone: string) => {
  if (phone === "") return false;
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

export default validatePhone;
