export type ToastTypesInterface = "success" | "info" | "warn" | "danger" | "secondary" | "contrast"

export interface ToastInterface {
    severity?: ToastTypesInterface
    summary?: string
    detail?: string
    key?: string
    life?: number
}  