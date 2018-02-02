import React from 'react';
export const renderField = field => {
  // destructuring -> takes the propertie specified from an object
  // you can go deeper if you just use it again
  const { touched, error } = field.meta;
  const className = `form-group ${touched && error ? 'has-danger': ''}`;
  console.log(field);
  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <input
        className='form-control '
        type={field.type || "text"}
        value={field.input.value || ""}
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </fieldset>
  );
}
