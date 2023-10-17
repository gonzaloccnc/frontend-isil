import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const { id } = params
  const form = await req.formData()
  const token = form.get('token')
  const image = form.get('link_file')

  const compMap = {
    title: '',
    link_file: form.get('link'),
    idClassroom: ''
  }

  form.forEach((x, y) => {
    if (y === 'token' || y === 'link_file' || y === 'link') return
    compMap[y] = x
  })

  if (image.size !== 0) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
      const result = await uploadToPromise(buffer, 'auto', 'complementaries')
      compMap.link_file = result.url
    } catch (ex) {
      NextResponse.json({ ok: false, data: null })
    }
  }

  try {
    const { data } = await axiosServer.put(`/user/course/complementaries/update/${id}`, compMap, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json({ ok: true, data })
  } catch (ex) {
    return NextResponse.json({ ok: false, data: null })
  }
}
