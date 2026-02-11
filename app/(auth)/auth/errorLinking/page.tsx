'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function ErrorLinkingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  // Mapeamento de mensagens amigáveis
  const errorMessages: Record<string, string> = {
    EmailMismatch: "The email on your social account is different from the one registered in your profile. To link them, both must be the same.",
    Default: "An unexpected error occurred during the account linking process."
  }

  const message = errorMessages[error as string] || errorMessages.Default

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="max-w-md w-full p-8 border rounded-xl shadow-lg bg-card text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Linking Failed</h1>
        <p className="text-muted-foreground mb-6">
          {message}
        </p>

        <Button 
          onClick={() => router.push('/dashboard/profile/personalData')}
          className="w-full flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Personal Data
        </Button>
      </div>
    </div>
  )
}