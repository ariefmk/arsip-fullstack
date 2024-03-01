import useUrut from './urut'
function Th(props) {
  const { w, className, text, onClick } = props
  return (
    <th
      className={`${w && `w-[${w}px]`} ${className} cursor-pointer hover:bg-gray-200`}
      onClick={onClick}
    >
      {text}
    </th>
  )
}

export { Th, useUrut }
