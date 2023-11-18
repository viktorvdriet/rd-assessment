import { useQuery } from 'react-query'
import styles from './list.module.scss'

import { FC, useEffect } from 'react'
import { fetchIssues } from '@/utilities/fetchIssues'
import Issue from '../issue/issue'

type Props = {
  org: string
  repo: string
}

type PropsIssue = {
  title: string
}

const List: FC<Props> = ({ org, repo }) => {
  const { data: issues = [], isLoading, isError, refetch } = useQuery(['issues', org, repo], () =>
    fetchIssues(org, repo)
  )

  useEffect(() => {
    refetch();
  }, [org, repo, refetch]);


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error fetching issues</p>

  // console.log(issues)

  return (
    <ul className={styles.list}>
      {issues.map((issue: PropsIssue, key: number) => {
        return (
          <li key={`issue-${key}`}>{issue.title}</li>
        )
      })}
    </ul>
  )
}

export default List
