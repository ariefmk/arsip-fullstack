export default function Textarea(props) {
  const { divClass, inputClass, name, label, disabled, register, errors } =
    props

  return (
    <div className={`${divClass} w-full place-self-start`}>
      <label htmlFor={name} className={`ml-2`}>
        {label}
      </label>
      <textarea
        className={`${inputClass} ${
          errors
            ? 'border-red-500'
            : 'border-black focus:border-green-500 read-only:focus:border-black'
        } block h-[5rem] w-full resize-none rounded-[5px] border-2 px-[5px] opacity-100 outline-none placeholder:text-black read-only:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200`}
        id={name}
        name={name}
        disabled={disabled}
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
