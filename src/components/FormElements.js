export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  required,
  value,
  name,
}) => {
  return (
    <>
      <div className="form-check">
        <input
          className={`form-check-input ${errors[name] && "is-invalid"}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        {/* Radio 使用 Name 欄位 */}
        <label className="form-check-label" htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className="invalid-feedback">{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};

export const Input = ({
  id,
  labelText,
  register,
  type,
  placeholder,
  required,
  errors,
  rules,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && "is-invalid"}`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const Textarea = ({
  id,
  labelText,
  placeholder,
  rows,
  register,
  errors,
  rules,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <textarea
        id={id}
        className={`form-control ${errors[id] && "is-invalid"}`}
        placeholder={placeholder}
        rows={rows}
        {...register(id, rules)}
      ></textarea>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};
