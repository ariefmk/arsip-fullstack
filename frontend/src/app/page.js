const kirimData = async(nik, kataSandi) => {
  const apiUrl = process.env.API_SERVER

  fetch(`${apiUrl}/masuk`, {
    type: 'POST'
  })
}

const Masuk = () => {
  return (
    <main>
      <form>
        <input type='text' name='nik'></input>
        <input type='password' name='kataSandi'></input>
        <button type='submit'>Masuk</button>
      </form>
    </main>
  )
}

export default Masuk
