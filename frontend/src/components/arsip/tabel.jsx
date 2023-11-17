export default function Tabel({ datalist }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Waktu</th>
            <th>Jenis</th>
            <th>Kategori</th>
            <th colSpan='3'>Aksi</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}
