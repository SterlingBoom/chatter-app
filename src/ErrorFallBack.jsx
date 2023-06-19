//eslint-disable-next-line react/prop-types
function ErrorFallback({ error }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      {/* eslint-disable-next-line react/prop-types */}
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback
