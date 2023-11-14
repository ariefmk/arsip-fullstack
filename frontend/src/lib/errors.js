export const Kesalahan = ({ errors }) => {
  return (
    <>
      {errors && (
        <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error'>
          {errors}
        </span>
      )}
    </>
  )
}
