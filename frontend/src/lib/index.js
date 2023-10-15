export const kapital = (teks) => {
  const arr = teks.split(' ')

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}

export const gantiSpasi = (teks) => {
  const arr = teks.split(' ')
  return arr.join('-')
}
