export default function Select(props) {
  const {
    children,
    divClass,
    selectClass,
    name,
    label,
    size,
    disabled,
    register,
    errors,
  } = props
  return (
    <div className={`${divClass} w-full place-self-start`}>
      <label htmlFor={name} className={`ml-2`}>{label}</label>
      <select
        className={`${selectClass} ${
          errors ? 'border-red-500' : 'border-black focus:border-green-500'
        } block h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] opacity-100 outline-none placeholder:text-black read-only:bg-white disabled:cursor-not-allowed disabled:bg-gray-200`}
        id={name}
        name={name}
        size={size}
        disabled={disabled}
        {...register}
      >
        {children}
      </select>
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
