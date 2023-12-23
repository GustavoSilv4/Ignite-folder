import { Post } from "./components/Post"
import { Header } from "./components/Header"

import styles from './App.module.css'

import "./global.css"
import Sidebar from "./components/Sidebar"

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author='Gustavo Miller'
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, doloribus! Nihil neque eos dolorem reprehenderit magnam. Sequi impedit, quam tempora voluptas veniam totam minus expedita blanditiis, harum, labore minima. Mollitia!"
          />
          <Post author='Fernanda Oliveira' content='Ola tudo bem?' />
        </main>
      </div>
    </div>
  )
}
