import { axiosServer } from '@/lib/axios'
import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const data = await req.formData()
  const image = data.get('file')
  const token = data.get('token')
  const { id } = params

  const map = {
    address: '',
    birthday: '',
    docId: '',
    email: '',
    firstname: '',
    surnames: '',
    phone: null,
    photo: null
  }

  data.forEach((x, y) => {
    if (y === 'file' || y === 'idUser' || y === 'token') return
    map[y] = x
  })

  if (image.size !== 0) {
    try {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = await uploadToPromise(buffer, 'auto', 'profiles')
      map.photo = result.url
    } catch (ex) {
      console.log(ex)
      return NextResponse.json({ ok: false, data: null })
    }
  }

  try {
    const { data } = await axiosServer.patch(`/user/me/${id}`, map, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return NextResponse.json({ ok: true, data: data.data })
  } catch (ex) {
    return NextResponse.json({ ok: false, data: null })
  }
}
