
const CourseIdPage = ({ params }) => {
  return (
    <div>
      id: {params.id}
      <iframe
        src='https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf'
        style={{ width: '600px', height: '500px' }}
        frameBorder='0'
      ></iframe>
    </div>
  )
}

export default CourseIdPage
