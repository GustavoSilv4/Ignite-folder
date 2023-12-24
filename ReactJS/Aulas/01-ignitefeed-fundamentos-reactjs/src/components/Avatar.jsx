import styles from './Avatar.module.css'

export function Avatar({ hasBorder = true, url }) {
  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={url} />
  )
}
