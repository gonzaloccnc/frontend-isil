import { uploadToPromise } from '@/lib/cloudinaryUtils'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const form = await req.formData()
  const image = form.get('linkFile')

  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const result = await uploadToPromise(buffer, 'auto', 'evaluations')

    return NextResponse.json({
      ok: true,
      data: result.url
    })
  } catch (ex) {
    return NextResponse.json({
      ok: false,
      ddta: null
    })
  }
}
