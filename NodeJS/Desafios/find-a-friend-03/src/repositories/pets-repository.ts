import { Pet, Prisma } from '@prisma/client'

export interface SearchManyParams {
  query: {
    city: string
    age?: string
    energy_level?: number
    size?: number
    independence_level?: number
  }
  page: number
}

export interface PetsRepository {
  searchMany({ query, page }: SearchManyParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
