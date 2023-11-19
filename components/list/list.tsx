import { useQuery } from 'react-query'
import styles from './list.module.scss'

import { FC, useEffect, useState } from 'react'
import { fetchIssues } from '@/utilities/fetchIssues'
import { Table } from '@radix-ui/themes'
import { useInView } from 'react-intersection-observer'
import Issue, { PropsIssue } from '../issue/issue'

type Props = {
  org: string
  repo: string
}

const List: FC<Props> = ({ org, repo }) => {
  const [page, setPage] = useState<number>(1);
  const [allIssues, setAllIssues] = useState<PropsIssue[]>([]);

  const { ref, inView } = useInView({ threshold: 1 })
  const { data: issues, isLoading, isError, error, refetch } = useQuery(['issues', org, repo, page], () =>
    fetchIssues(org, repo, page)
  );

  useEffect(() => {
    if (!isLoading) {
      // Concatenate new issues with existing ones when issues change
      setAllIssues((prevIssues) => [...prevIssues, ...(issues || [])]);
    }

  }, [issues, isLoading]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prevPage: number) => prevPage + 1);
      refetch();
    }
  }, [inView, isLoading, refetch]);

  // Debugging purposes

  // useEffect(() => {
  //   if (allIssues.length > 0) {
  //     console.log(allIssues);
  //   }
  // }, [allIssues]);

  if (isError) return <p>Error fetching issues: {(error as Error)?.message}</p>;

  return (
    <>
      {allIssues.length > 0 && (
        <Table.Root variant="surface" className={styles.list}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {allIssues.map((issue: PropsIssue, key: number) => {
              return (
                <Issue
                  key={`issue-${key}`}
                  number={issue.number}
                  created_at={issue.created_at}
                  state={issue.state}
                  title={issue.title}
                  html_url={issue.html_url}
                />
              )
            })}
          </Table.Body>
        </Table.Root >
      )}

      <div ref={ref}>
        {!isLoading && "Loading..."}
      </div>
    </>
  )
}

export default List
