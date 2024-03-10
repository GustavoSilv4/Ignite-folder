import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { HashComparer } from 'src/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from 'src/domain/forum/application/cryptography/hash-generator'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
