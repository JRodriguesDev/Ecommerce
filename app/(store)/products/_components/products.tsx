import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter } from "@/components/ui/card"

export const ProductList = async ({params}: {params: {[key: string]: string | string[] | undefined}}) => {

  return (
    <p>Lista</p>
  )
}

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden border-zinc-800 bg-zinc-950/50 min-h-[450px]">
          
          {/* CONTAINER DA IMAGEM: Agora sem wrappers que adicionam padding */}
          <div className="w-full aspect-[4/5] relative">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-zinc-900" />
          </div>

          {/* CONTEÚDO ABAIXO DA IMAGEM */}
          <CardFooter className="flex flex-col items-start w-full p-4 gap-3">
            {/* Category */}
            <Skeleton className="h-3 w-20 bg-zinc-900" />
            
            {/* Title */}
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full bg-zinc-900" />
              <Skeleton className="h-4 w-[85%] bg-zinc-900" />
            </div>
            
            {/* Price Area */}
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-6 w-16 bg-zinc-800" />
              <Skeleton className="h-4 w-12 bg-zinc-900" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}