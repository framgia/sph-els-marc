export const Spinner = () => {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', opacity: '0.6' }}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth={5}
        />
      </svg>
    </div>
  )
}
