import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from './Avatar'

import styles from './Comment.module.css'
import { useState } from 'react'

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount(state => state + 1)
  }

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

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
