export default function Textarea(props) {
  const {
    label,
    name,
    register,
    divClass,
    textareaClass,
    placeholder,
    errors,
    disabled,
    onInput,
  } = props
  return (
    <div className={`${divClass} relative`}>
      <textarea
        id={name}
        className={`${textareaClass} ${label && 'pt-2'} ${
          errors ? 'border-red-500' : 'border-black focus:border-green-500'
        } peer block h-[5rem] w-full resize-none rounded-[5px] border-2 px-[5px] opacity-100 outline-none placeholder:text-black disabled:cursor-not-allowed disabled:bg-gray-200`}
        placeholder={label ? '' : placeholder}
        name={name}
        disabled={disabled}
        {...register}
      />
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
        <span className='daisy-badge daisybadge-outline top-[35px] h-auto text-center text-xs text-red-500'>
          {errors?.message}
        </span>
      )}
    </div>
  )
}
