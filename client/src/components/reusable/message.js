import React from 'react';

const Message = ({message, error}) => (
  <div className={`message ${error ? 'error' : 'success'}`}>
    {message}
  </div>
);

export default Message;
