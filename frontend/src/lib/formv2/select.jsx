export default function Select(props) {
  const { children, divClass, selectClass, name, label, size, disabled, register, errors } = props
  return (
    <div className={`${divClass}`}>
      <label htmlFor={name}>{label}</label>
      <select
        className={`${selectClass} ${errors? 'border-red-500': 'border-black focus:border-green-500'} outline-none block h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] opacity-100 placeholder:text-black disabled:cursor-not-allowed disabled:bg-gray-200 read-only:bg-white`}
        id={name}
        name={name}
        size={size}
        disabled={disabled}
        {...register}
      >{children}</select>
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
