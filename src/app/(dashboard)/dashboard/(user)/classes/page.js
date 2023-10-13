
const ClassesPage = () => {
  const clases = [{
    title: 'Algoritmos',
    teacher: 'El profe'
  }, {
    title: 'Marke',
    teacher: 'La market'
  }, {
    title: 'ASDAS',
    teacher: 'eL ASDAS'
  }]

  return (
    <section>
      {
        clases.map(x => (
          <div key={x.title}>
            <p>{x.title}</p>
            <span>{x.teacher}</span>
          </div>
        ))
      }
    </section>
  )
}

export default ClassesPage
