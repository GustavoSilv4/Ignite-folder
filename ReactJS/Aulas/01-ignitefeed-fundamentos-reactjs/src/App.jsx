import { Post } from "./components/Post"
import { Header } from "./components/Header"

import styles from './App.module.css'

import "./global.css"
import Sidebar from "./components/Sidebar"

// author: {avatar_url: '', name: '', role: ''},
// publishedAt: Date,
// content: String

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/gustavosilv4.png',
      name: 'Gustavo Silva',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },

      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },

      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-12-24 17:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },

      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },

      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-12-24 17:00:00')
  },

]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  publishedAt={post.publishedAt}
                  content={post.content}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}
