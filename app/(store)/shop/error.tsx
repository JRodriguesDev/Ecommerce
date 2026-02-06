'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Aqui você enviaria o erro para um serviço como Sentry ou LogRocket
    console.error('Shop Error:', error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      {/* Ícone de Alerta Sutil */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
        Something went wrong!
      </h1>
      
      <p className="mb-8 max-w-md text-zinc-500">
        We couldn&apos;t load the store sections. This might be a temporary connection issue with our database.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Botão de Tentar Novamente (Chama a função reset do Next.js) */}
        <Button 
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-8"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>

        {/* Botão de Voltar para Home */}
        <Link href="/">
          <Button variant="outline" className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white flex items-center gap-2 w-full sm:w-auto">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* ID do Erro (Opcional, útil para suporte) */}
      {error.digest && (
        <span className="mt-12 text-[10px] uppercase tracking-widest text-zinc-700">
          Error ID: {error.digest}
        </span>
      )}
    </main>
  )
}

export default Error