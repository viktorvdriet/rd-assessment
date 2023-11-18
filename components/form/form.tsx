import styles from './form.module.scss'

import { FC } from 'react'

const Form: FC = () => {
  return (
    <form className={styles.form}>
      <label>Please provide a URL to your public GitHub repo</label>
      <input type="text" />
      <button>submit</button>
    </form>
  )
}

export default Form
