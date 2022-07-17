import { member_gender } from '@prisma/client'

export interface Member {
  id_member?: number
  region_id: number
  nik: string
  fullname?: string
  photo: string
  photo_ktp: string
  address?: string
  phone_number?: string
  email?: string
  place_of_birth: string
  date_of_birth: Date
  gender?: member_gender
  status?: number
  created_date?: Date
  admin_id?: number
  updated_by?: number
}
