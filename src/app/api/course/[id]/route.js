import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const data = await req.formData()
  const image = data.get('syllabus')
  const token = data.get('token')
  // const idPrevImage = data.get('url').split('/syllabus/')[1].split('.pdf')[0]

  const courseMap = {
    courseName: '',
    credits: 0,
    syllabus: data.get('url'),
    description: ''
  }

  data.forEach((x, y) => {
    if (y === 'token' || y === 'url') return
    courseMap[y] = x
  })

  courseMap.syllabus = data.get('url')

  if (image.size !== 0) {
    // subir y elimar la iamgen anterior
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
      // await deleteResourcePromise(idPrevImage)
      const result = await uploadToPromise(buffer)
      courseMap.syllabus = result.url
    } catch (ex) {
      NextResponse.json({ ok: false, data: null })
    }
  }

  try {
    const { data } = await axiosServer.put(`/admin/course/update/${params.id}`, courseMap, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return NextResponse.json({ ok: true, data })
  } catch (ex) {
    NextResponse.json({ ok: false, data: null })
  }
}
