import { Button, Code, TextField } from '@radix-ui/themes';
import styles from './form.module.scss'

import { ChangeEvent, FC, FormEvent, useState } from 'react'

type Props = {
  onSubmit: (org: string, repo: string) => void;
}

type FormData = {
  input: string;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<FormData>({
    input: ""
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [org, repo] = data.input.split('/');
    onSubmit(org, repo);
    setData({ input: '' })
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.label}>
        Please provide a valid Github Organization & Repo,
        <span>for example <Code>vercel/next.js</Code></span>
      </label>
      <TextField.Input size="3" type="text" name="input" onChange={changeHandler} defaultValue={data.input} />
      <Button className={styles.button} type="submit">Submit</Button>
    </form>
  )
}

export default Form
