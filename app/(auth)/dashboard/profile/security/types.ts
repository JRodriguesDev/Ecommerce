export interface Props {
    label: string
    type: "PASSWORD" | "2FA"
    userId: string
    isTwoFactorEnabled?: boolean
}