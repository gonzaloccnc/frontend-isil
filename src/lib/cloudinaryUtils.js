import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const deleteResourcePromise = (id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy('syllabus/' + id, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

export const uploadToPromise = (buffer, resource = 'auto', folder = 'syllabus') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder, resource_type: resource }, (err, result) => {
      if (err) reject(err)
      resolve(result)
    }).end(buffer)
  })
}
