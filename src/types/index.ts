import { AxiosError } from "axios"

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  company: string,
}

export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined
}
