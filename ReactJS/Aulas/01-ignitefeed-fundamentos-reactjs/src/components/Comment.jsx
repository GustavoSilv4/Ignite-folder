import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from './Avatar'

import styles from './Comment.module.css'

export function Comment({ content }) {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} url={'https://github.com/diego3g.png'} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Gustavo Silva</strong>

              <time title="12 de dezembro às 08:21h" dateTime='2023-12-23 08:21:21'>Cerca de 1h atrás</time>
            </div>

            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp /> Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
