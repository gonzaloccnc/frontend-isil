import { uploadToPromise } from '@/lib/uploadFileCLoud'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.formData()
  const image = data.get('syllabus')
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const course = {
    title: '',
    credits: 0,
    syllabus: '',
    description: ''
  }

  data.forEach((x, y) => { course[y] = x })

  try {
    // const result = await uploadToPromise(buffer)
    // console.log(result)
    // data.syllabus = result.url
    data.syllabus = 'file.pdf'
    return NextResponse.json({ ok: true, data: null })
  } catch (ex) {
    return NextResponse.json({ ok: false, messag: ex.message })
  }
}
