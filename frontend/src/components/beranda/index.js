export default function Beranda({ data }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Selamat Datang, Admin!</h1>
        <div className="grid grid-cols-3 gap-4">
          {/*Admin*/}
          <SummaryCard title="Pengguna" value={data.pengguna} color="green" />
          <SummaryCard title="Arsip" value={data.arsip} color="green" />
          <SummaryCard title="Aktivitas Hari Ini" value={0} color="green" />
          {/*Umum*/}
          <SummaryCard title="Arsip" value={data.arsip} color="green" />
          <SummaryCard title="Kategori Arsip" value={data.kategori} color="green" />
          <SummaryCard title="Arsip Bulan Ini" value={data.arsipBulanan} color="green" />
          {/*Lain*/}
          <SummaryCard title="Arsip Bidang Lain" value={data.arsip} color="green" />
          <SummaryCard title="Kategori Arsip Bidang Lain" value={data.kategori} color="green" />
          <SummaryCard title="Arsip Bulan Ini" value={data.arsipBulanan} color="green" />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className={`p-4 bg-${color}-500 text-white rounded-md`}>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
