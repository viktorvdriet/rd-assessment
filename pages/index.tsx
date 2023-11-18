import Form from '@/components/form/form'
import List from '@/components/list/list'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>GitHub Issue Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>GitHub Issue Viewer</h1>
        <Form />
        {org && repo && <List org={org} repo={repo} />}
      </main>
    </>
  )
}
