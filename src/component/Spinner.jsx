import './Spinner.css' 
const Spinner = () => {
  return (
    <div className='spinner-border text-primary mt-5 spiner' role='status'>
      <span className='visually-hidden'>
        {' '}
        <em>Loading Please wait....</em>{' '}
      </span>
    </div>
  )
}

export default Spinner