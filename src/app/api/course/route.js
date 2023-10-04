
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToPromise = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'syllabus' }, (err, result) => {
      if (err) reject(err)
      resolve(result)
    }).end(buffer)
  })
}

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
