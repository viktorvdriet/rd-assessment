import { useQuery } from 'react-query'
import styles from './list.module.scss'

import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { FC, useEffect, useState } from 'react'
import { fetchIssues } from '@/utilities/fetchIssues'
import { Button, Table } from '@radix-ui/themes'
import { format, parseISO } from 'date-fns'
import { useInView } from 'react-intersection-observer'

type Props = {
  org: string
  repo: string
}

type PropsIssue = {
  title: string
  created_at: string
  number: number
  state: string
  html_url: string
}

const List: FC<Props> = ({ org, repo }) => {
  const [page, setPage] = useState<number>(1);
  const [allIssues, setAllIssues] = useState<PropsIssue[]>([]);

  const { ref, inView } = useInView({ threshold: 1 })
  const { data: issues, isLoading, isError, refetch } = useQuery(['issues', org, repo, page], () =>
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
    }
  }, [inView, isLoading]);

  useEffect(() => {
    if (inView && !isLoading) {
      refetch();
    }
  }, [inView, isLoading, refetch]);

  if (isError) return <p>Error fetching issues, please contact your webmaster.</p>

  console.log(allIssues)

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {allIssues.map((issue: PropsIssue, key: number) => {
            const date = format(parseISO(issue.created_at), 'dd MMM yyyy');

            return (
              <Table.Row key={`issue-${key}`}>
                <Table.RowHeaderCell>{`#${issue.number}`}</Table.RowHeaderCell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{issue.state}</Table.Cell>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell><a href={issue.html_url} target="_blank"><ExternalLinkIcon /></a></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>

      <div ref={ref}>
        Loading...
      </div>
    </>
  )
}

export default List
