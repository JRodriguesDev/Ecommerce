// page.tsx (Sua página principal de favoritos)
import { Favorites as FavoritesComponent } from './_components/favorites'

const FavoritesPage = () => {
    return (
        <main className="min-h-screen bg-zinc-950">
            <FavoritesComponent />
        </main>
    )
}

export default FavoritesPage