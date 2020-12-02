import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import LoaderButton from './LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import './BillingForm.css';
import { CardElement, injectStripe } from 'react-stripe-elements';

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  const validateForm = () =>
    fields.name !== '' && fields.storage !== '' && isCardComplete;

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const {token, error} = await props.stripe.createToken({name: fields.name});
    setIsProcessing(false);
    onSubmit(fields.storage, { token, error });
  };

  return (
    <Form className="BillingForm" onSubmit={handleSubmitClick}>
      <Form.Group size="lg" controlId="storage">
        <Form.Label>Storage</Form.Label>
        <Form.Control
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </Form.Group>

      <Form.Group size="lg" controlId="name">
        <Form.Label>Cardholder&apos;s name</Form.Label>
        <Form.Control
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on card"
        />
      </Form.Group>

      <Form.Label>Credit Card Info</Form.Label>
      <CardElement
        className="card-field"
        onChange={(e) => setIsCardComplete(e.complete)}
        style={{
          base: {
            fontSize: '16px',
            color: '#495057',
            fontFamily: "'Open Sans', sans-serif",
          },
        }}
      />

      <LoaderButton
        block
        size="lg"
        type="submit"
        isLoading={isLoading}
        disabled={!validateForm()}>
        Purchase
      </LoaderButton>
    </Form>
  );
}

export default injectStripe(BillingForm);
