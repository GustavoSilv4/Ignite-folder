import { Entity } from '@/domain/core/entities/entity'
import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'
import { Optional } from '@/domain/core/types/optional'

export interface NotificationProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  read?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get read() {
    return this.props.read
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
