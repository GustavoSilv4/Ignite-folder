import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState([
    'Muito bom Devon, parabéns!! 👏👏',
  ])
  const [inputNewComment, setInputNewComment] = useState('')

  const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(e) {
    e.preventDefault()

    if (inputNewComment !== '') {
      setComments(state => [...state, inputNewComment])
      setInputNewComment('')
    }

    return
  }

  function deleteComment(commentForDelete) {
    setComments(state => state.filter(comment => comment !== commentForDelete))
  }

  const isNewCommentEmpty = inputNewComment.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar url={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          })
        }

      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={inputNewComment}
          onChange={(e) => setInputNewComment(e.target.value)}
          placeholder='Deixe um comentário'
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>

      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
          })
        }
      </div>
    </article>
  )
}
