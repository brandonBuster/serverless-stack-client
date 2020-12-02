const config = {
  MAX_ATTACHMENT_SIZE: 5000000,

  STRIPE_KEY: 'pk_test_51HtIQhBxakHitAQc9oWxPWFlmoVChHIfL1jX8ozfnNkXoenyERU7zUK2GkhhTAgWaAGqIZvzdwpSd4dXO5CElpSG00vPrlyE2N',
  
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'serverless-notes-upload-bbuster',
  },

  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://ym8j6xjmp3.execute-api.us-east-1.amazonaws.com/prod',
  },
  
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_gYm9GRLw8',
    APP_CLIENT_ID: '7dcceshqtc16p88vete4mv0bpe',
    IDENTITY_POOL_ID: 'us-east-1:3434a849-dc8c-4dcb-a27c-6607368a8af0',
  },
};

export default config;
