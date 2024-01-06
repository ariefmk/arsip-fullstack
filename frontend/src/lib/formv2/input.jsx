export default function Input(props) {
  const {
    divClass,
    inputClass,
    name,
    type,
    label,
    maxLength,
    pattern,
    onInput,
    inputMode,
    disabled,
    readOnly,
    value,
    accept,
    hidden,
    onChange,
    register,
    errors,
  } = props
  return (
    <div className={`${divClass} w-full place-self-start`}>
      <label htmlFor={name} className={`ml-2`}>
        {label}
      </label>
      <input
        className={`${inputClass} ${
          errors
            ? 'border-red-500'
            : 'border-black focus:border-green-500 read-only:focus:border-black'
        } block h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] opacity-100 outline-none placeholder:text-black read-only:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200`}
        type={type}
        id={name}
        name={name}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        accept={accept}
        hidden={hidden}
        onInput={onInput}
        onChange={onChange}
        {...register}
      />
      {errors && (
        <span
          className={`daisy-badge daisy-badge-outline h-auto text-center text-xs text-red-500`}
        >
          {errors?.message}
        </span>
      )}
    </div>
  )
}
