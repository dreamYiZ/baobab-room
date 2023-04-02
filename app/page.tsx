import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "@/app/style/page.module.scss"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      home
    </main>
  )
}
