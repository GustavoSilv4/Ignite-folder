import { PencilLine } from 'phosphor-react'

import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src="https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className={styles.profile}>
        <img className={styles.avatar} src="https://github.com/gustavosilv4.png" alt="" />

        <strong>Gustavo Silva</strong>
        <span>Developer</span>
      </div>

      <footer><a href="#"><PencilLine size={20} /> Editar seu perfil</a></footer>
    </aside>
  )
}
