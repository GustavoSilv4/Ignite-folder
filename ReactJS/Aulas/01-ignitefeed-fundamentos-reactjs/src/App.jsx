import { Post } from "./Post"
import { Header } from "./components/Header"

import "./global.css"

export function App() {
  return (
    <div>
      <Header />
      <Post
        author='Gustavo Miller'
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, doloribus! Nihil neque eos dolorem reprehenderit magnam. Sequi impedit, quam tempora voluptas veniam totam minus expedita blanditiis, harum, labore minima. Mollitia!"
      />
      <Post author='Fernanda Oliveira' content='Ola tudo bem?' />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
