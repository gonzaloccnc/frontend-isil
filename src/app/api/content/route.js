import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const data = await req.formData()
  const token = data.get('token')
  const image = data.get('linkFile')
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const contentMap = {
    title: '',
    numOrder: 1,
    linkFile: '',
    description: '',
    idCourse: ''
  }

  data.forEach((x, y) => {
    if (y === 'token' || y === 'linkFile') return
    contentMap[y] = x
  })

  try {
    const result = await uploadToPromise(buffer, 'auto', 'contents')
    contentMap.linkFile = result.url

    const { data: content } = await axiosServer.post('/admin/course/content/Create', JSON.stringify(contentMap), {
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
