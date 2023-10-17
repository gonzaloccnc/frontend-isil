import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const data = await req.formData()
  const token = data.get('token')
  const image = data.get('link_file')
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const complMap = {
    title: '',
    link_file: '',
    idClassroom: ''
  }

  data.forEach((x, y) => {
    if (y === 'link_file' || y === 'token') return
    complMap[y] = x
  })

  try {
    const result = await uploadToPromise(buffer, 'auto', 'complementaries')
    complMap.link_file = result.url

    const { data: content } = await axiosServer.post('/user/course/complementaries/create', JSON.stringify(complMap), {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json({ ok: true, data: content })
  } catch (ex) {
    return NextResponse.json({ ok: false, message: ex.message })
  }
}
