import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const tambahArsip = (data) => {
    console.log(data)
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        <form
          onSubmit={handleSubmit(tambahArsip)}
          encType='multipart/form-data'
        >
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Kode Arsip'
              {...register('kode')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select className={inputInisial} {...register('kategori')}>
              <option value=''>Kategori</option>
            </select>
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select className={`${inputInisial}`} {...register('jenis')}>
              <option value=''>Jenis</option>
            </select>
            <Kesalahan errors={errors.jenis?.message} />
          </div>
          <div>
            <input
              type='date'
              className={`${inputInisial}`}
              placeholder='Retensi'
              {...register('retensi')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select className={inputInisial} {...register('penyimpanan')}>
              <option value=''>Penyimpanan</option>
            </select>
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Perihal'
              {...register('perihal')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <textarea
              className={`${inputInisial} resize-none`}
              {...register('keterangan')}
            />
            <Kesalahan errors={errors.keterangan?.message} />
          </div>
          <div>
            <select className={`${inputInisial}`} {...register('visibilitas')}>
              <option value=''>Visibilitas</option>
            </select>
            <Kesalahan errors={errors.visibilitas?.message} />
          </div>
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Visibilitas'
              {...register('pengguna')}
            />
            <Kesalahan errors={errors.pengguna?.message} />
          </div>
          <input type='file' id='tambah-berkas' accept='.pdf' {...register('berkas')}/>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah />
            <TombolReset />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        onClick={() => {
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
