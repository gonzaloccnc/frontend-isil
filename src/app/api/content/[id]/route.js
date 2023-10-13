import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const data = await req.formData()
  const token = data.get('token')
  const image = data.get('linkFile')

  const contentMap = {
    title: '',
    numOrder: 1,
    linkFile: data.get('url'),
    description: '',
    idCourse: data.get('idCourse')
  }

  data.forEach((x, y) => {
    if (y === 'token' || y === 'linkFile') return
    contentMap[y] = x
  })

  contentMap.linkFile = data.get('url')

  if (image.size !== 0) {
    // subir y elimar la iamgen anterior
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
      // await deleteResourcePromise(idPrevImage)
      const result = await uploadToPromise(buffer, 'auto', 'contents')
      contentMap.linkFile = result.url
    } catch (ex) {
      NextResponse.json({ ok: false, data: null })
    }
  }

  try {
    const { data } = await axiosServer.put(`/admin/course/content/update/${params.id}`, contentMap, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return NextResponse.json({ ok: true, data })
  } catch (ex) {
    NextResponse.json({ ok: false, data: null })
  }
}
