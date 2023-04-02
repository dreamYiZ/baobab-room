import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "@/app/style/page.module.scss"
import ChatRoom from "@/app/c/ChatRoom/ChatRoom"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <ChatRoom />
    </main>
  )
}
