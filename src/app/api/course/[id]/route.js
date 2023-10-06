import { deleteResourcePromise, uploadToPromise } from '@/lib/uploadFileCLoud'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const data = await req.formData()
  const image = data.get('syllabus')
  const idPrevImage = data.get('url').split('/syllabus/')[1].split('.pdf')[0]

  console.log(idPrevImage)

  if (image.size !== 0) {
    // subir y elimar la iamgen anterior
    console.log('hay imagen')
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
      await deleteResourcePromise(idPrevImage)
      const result = await uploadToPromise(buffer)
      data.set('url', result.url)
      console.log(result.url)
    } catch (ex) {
      console.log(ex.message)
    }
  }

  // patch to java backend
  console.log('no hay iamgen')

  console.log(params)
  return NextResponse.json({ ok: true, data: null })
}
