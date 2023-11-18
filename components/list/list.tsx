import styles from './list.module.scss'

import { FC } from 'react'

type Props = {

}

const List: FC<Props> = ({ }) => {
  return (
    <ul className={styles.list}>
      <li>Issue 1</li>
    </ul>
  )
}

export default List
