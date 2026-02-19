export interface AvatarProps {
    images: { 
        main: string | null; 
        google: string | null; 
        discord: string | null; 
    }
}

export interface Props {
  children: React.ReactNode
  images: { main: string | null; google: string | null; discord: string | null }
}