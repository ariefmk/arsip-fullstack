export default function Input(props) {
  const {
    label,
    name,
    register,
    divClass,
    inputClass,
    placeholder,
    type,
    errors,
    disabled,
    onInput,
    inputMode,
    value,
    onChange
  } = props
  return (
    <div className={`${divClass} relative`}>
      <input
        type={type}
        id={name}
        className={`${inputClass} ${label && 'pt-2'} ${
          errors ? 'border-red-500' : 'border-black focus:border-green-500'
        } peer block h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] opacity-100 outline-none placeholder:text-black disabled:cursor-not-allowed disabled:bg-gray-200`}
        placeholder={label ? '' : placeholder}
        name={name}
        onInput={onInput}
        inputMode={inputMode}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...register}
      />
      {label && (
        <label
          htmlFor={name}
          className={`${
            errors
              ? 'peer-focus:border-red-500 border-red-500'
              : 'peer-focus:border-green-500 peer-focus:text-green-500'
          } rounded-box absolute start-1 -top-[10px] origin-[0] scale-[.92] transform border-2 border-black !bg-white px-[12px] px-[5px] text-sm text-black peer-disabled:!bg-gray-200 peer-disabled:text-black`}
        >
          {placeholder}
        </label>
      )}
      {errors && (
        <span className='daisy-badge daisy-badge-outline top-[35px] h-auto text-center text-xs text-red-500'>
          {errors?.message}
        </span>
      )}
    </div>
  )
}
