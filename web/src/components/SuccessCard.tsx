import React, { forwardRef } from 'react';
import '../css/SuccessCard.css';
import { BsCheck2Circle } from 'react-icons/bs';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const handleClick = async () => {
  window.location.reload();
};
const SuccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <BsCheck2Circle size={40} color="dodgerblue" />
        <h2>Success</h2>
      </CardHeader>
      <CardBody>
        <p>Thank you for using our service.</p>
        <p>Your model has been successfully uploaded</p>
      </CardBody>
      <CardFooter>
        <Button onClick={handleClick}>Continue</Button>
      </CardFooter>
    </Card>
  );
};
export default SuccessCard;
