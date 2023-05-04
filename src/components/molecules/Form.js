import React from 'react';

function Form({ onSubmit, children }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

export default Form;