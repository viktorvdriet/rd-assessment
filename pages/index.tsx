import Form from '@/components/form/form'
import List from '@/components/list/list'
import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const [org, setOrg] = useState('');
  const [repo, setRepo] = useState('');

  const formSubmitHandler = (org: string, repo: string) => {
    setOrg(org);
    setRepo(repo);
  };

  return (
    <>
      <Head>
        <title>GitHub Issue Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>GitHub Issue Viewer</h1>
        <Form onSubmit={formSubmitHandler} />
        {org && repo && <List org={org} repo={repo} />}
      </main>
    </>
  )
}
