import { AccordionW } from '@/components/accordion/AccordionW'
import { ContentNav } from '@/components/navs/ContentNav'

const CourseIdPage = ({ params }) => {
  const contents = [
    {
      id: 1,
      title: 'Fundamentos de JavaScript',
      description: 'Aprende los conceptos básicos de JavaScript, incluyendo variables, tipos de datos y operadores.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 1
    },
    {
      id: 2,
      title: 'Condicionales y bucles',
      description: 'Explora las estructuras de control en JavaScript, como if, else, for y while.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 2
    },
    {
      id: 3,
      title: 'Funciones en JavaScript',
      description: 'Aprende a definir y utilizar funciones en JavaScript.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 3
    },
    {
      id: 4,
      title: 'Trabajando con objetos y arrays',
      description: 'Descubre cómo crear, manipular y acceder a datos en objetos y arrays.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 4
    },
    {
      id: 5,
      title: 'Manipulación del DOM y eventos',
      description: 'Aprende a interactuar con el Document Object Model (DOM) y manejar eventos en páginas web.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 5
    },
    {
      id: 6,
      title: 'Introducción a jQuery',
      description: 'Conoce la biblioteca jQuery y cómo simplifica la manipulación del DOM.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 6
    },
    {
      id: 7,
      title: 'Comunicación con el servidor',
      description: 'Aprende a realizar solicitudes AJAX y gestionar respuestas del servidor.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 7
    },
    {
      id: 8,
      title: 'Fundamentos de Node.js',
      description: 'Descubre cómo utilizar Node.js para desarrollar aplicaciones del lado del servidor.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 8
    },
    {
      id: 9,
      title: 'Creación de aplicaciones web con Express.js',
      description: 'Aprende a construir aplicaciones web utilizando el framework Express.js.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 9
    },
    {
      id: 10,
      title: 'Diseño y creación de API RESTful',
      description: 'Explora cómo diseñar y construir APIs RESTful utilizando Node.js y Express.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 10
    },
    {
      id: 11,
      title: 'Seguridad en aplicaciones web',
      description: 'Aprende a implementar sistemas de autenticación y autorización en tus aplicaciones.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 11
    },
    {
      id: 12,
      title: 'Empaquetado de aplicaciones web con Webpack',
      description: 'Descubre cómo usar Webpack para empaquetar y optimizar tu código JavaScript.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 12
    },
    {
      id: 13,
      title: 'Testing en JavaScript',
      description: 'Aprende a escribir pruebas unitarias para garantizar la calidad de tu código.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 13
    },
    {
      id: 14,
      title: 'Introducción a [Nombre del framework]',
      description: 'Explora las bases de un popular framework de JavaScript y su uso en el desarrollo web.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 14
    },
    {
      id: 15,
      title: 'Despliegue de aplicaciones web',
      description: 'Aprende cómo publicar y hospedar tus aplicaciones en línea.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 15
    },
    {
      id: 16,
      title: 'Desarrollo de una aplicación web completa',
      description: 'Aplica todos los conocimientos adquiridos en un proyecto web real.',
      file: 'https://res.cloudinary.com/durrquwiy/image/upload/v1696429894/syllabus/ckzyzajobqjc97qt4sne.pdf',
      order: 16
    }
  ]

  return (
    <section>
      <ContentNav courseName='Algoritmos' />
      <AccordionW items={contents} />
    </section>
  )
}

export default CourseIdPage
