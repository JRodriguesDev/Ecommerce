const IdLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <p className="text-gray-500 text-sm">Validating your transaction with Stripe...</p>
      </div>
    </div>
  )
}

export default IdLoading