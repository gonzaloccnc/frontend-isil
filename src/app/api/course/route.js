import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'

import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.formData()
  const token = data.get('token')
  const image = data.get('syllabus')
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const courseMap = {
    courseName: '',
    credits: 0,
    syllabus: '',
    description: ''
  }

  data.forEach((x, y) => {
    if (y === 'token' || y === 'syllabus') return
    courseMap[y] = x
  })

  try {
    const result = await uploadToPromise(buffer)
    courseMap.syllabus = result.url

    const { data: course } = await axiosServer.post('/admin/course/create', JSON.stringify(courseMap), {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json({ ok: true, data: course })
  } catch (ex) {
    return NextResponse.json({ ok: false, message: ex.message })
  }
}
