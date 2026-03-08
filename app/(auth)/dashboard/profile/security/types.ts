export interface Props {
    label: string
    type: "PASSWORD" | "2FA"
    isTwoFactorEnabled?: boolean
}