import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to Sportify</a>
        </h1>

        <p className={styles.description}>
          Play the sports you want with the people you want
        </p>

        <div className={styles.grid}>


          <Link href="/frontpage/Login">
            <a className={styles.card}>
              <h3> Login&rarr;</h3>
              <p>Log into your account and start playing!</p>


            </a>
          </Link>


          <Link href="/frontpage/Login">
            <a className={styles.card}>
              <h3> Sign Up&rarr;</h3>
              <p>Create an account to find matches nearby!</p>


            </a>
          </Link>



          <Link href="/frontpage/Login">
            <a className={styles.card}>
              <h3> About Us&rarr;</h3>
              <p>Learn More about Sportify</p>


            </a>
          </Link>




        </div>
      </main>


    </div>
  )
}
