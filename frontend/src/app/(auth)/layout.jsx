import Header from './components/header'

export default function Layout(props) {
  return (
    <>
      <Header nama ='Admin' />
      {props.children}
    </>
  )
}
