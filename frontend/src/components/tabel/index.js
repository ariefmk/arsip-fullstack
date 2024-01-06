import useUrut from './urut'
function Th(props) {
  const { w, text, onClick } = props
  return (
    <th
      className={`${w && `w-[${w}px]`} cursor-pointer hover:bg-gray-200`}
      onClick={onClick}
    >
      {text}
    </th>
  )
}

export { Th, useUrut }
