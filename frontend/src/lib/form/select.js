export default function Pilih(props) {
  const {
    referensi,
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
    onChange,
    childre,
  } = props

  return (
    <div className={`${divClass} relative`}>
      <select
        className={`${
          errors ? 'border-red-500' : 'border-black focus:border-green-500'
        }`}
      >
        {children}
      </select>
      {label && (
        <label
          htmlFor={name}
          className={`${
            errors
              ? 'border-red-500 peer-focus:border-red-500'
              : 'peer-focus:border-green-500 peer-focus:text-green-500'
          } rounded-box absolute -top-[10px] start-1 origin-[0] scale-[.92] transform border-2 border-black !bg-white px-[12px] px-[5px] text-sm text-black peer-disabled:!bg-gray-200 peer-disabled:text-black`}
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
