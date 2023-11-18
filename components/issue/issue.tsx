import { Badge, Table } from '@radix-ui/themes'
import styles from './issue.module.scss'

import { FC } from 'react'
import { format, parseISO } from 'date-fns'
import { ExternalLinkIcon, } from '@radix-ui/react-icons'

export type PropsIssue = {
  number: number
  created_at: string
  state: string
  title: string
  html_url: string
}

const Issue: FC<PropsIssue> = ({ number, created_at, state, title, html_url }) => {
  const date = format(parseISO(created_at), 'dd MMM yyyy');

  const stateColor = (status: string) => {
    if (status === 'open') return "green"
    if (status === 'closed') return "red"
  }

  return (
    <Table.Row className={styles.issue}>
      <Table.RowHeaderCell>{`#${number}`}</Table.RowHeaderCell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell><div className={styles.title}>{title}</div></Table.Cell>
      <Table.Cell justify="center">
        <Badge color={stateColor(state)}>{state}</Badge>
      </Table.Cell>
      <Table.Cell justify="center"><a href={html_url} target="_blank"><ExternalLinkIcon /></a></Table.Cell>
    </Table.Row>
  )
}

export default Issue