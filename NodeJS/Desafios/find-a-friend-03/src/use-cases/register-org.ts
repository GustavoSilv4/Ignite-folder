import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface CreateOrgUseCaseRequest {
  responsible_person: string
  email: string
  cep: string
  city: string
  state: string
  adress: string
  contact: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const emailAlreadyExists = await this.orgsRepository.findByEmail(data.email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const { password, ...dataOrg } = data

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({ ...dataOrg, password_hash })

    return {
      org,
    }
  }
}
