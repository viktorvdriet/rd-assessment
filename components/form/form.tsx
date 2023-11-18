import { Button, TextField } from '@radix-ui/themes';
import styles from './form.module.scss'

import { ChangeEvent, FC, FormEvent, useState } from 'react'

type Props = {
  onSubmit: (org: string, repo: string) => void;
}

type FormData = {
  url: string;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<FormData>({
    url: "https://github.com/vercel/next.js"
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

    const url = new URL(data.url)
    const paths = url.pathname.split('/').filter(part => part !== '');
    const org = paths[0];
    const repo = paths[1];

    onSubmit(org, repo);
    setData({ url: '' })
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label>Please provide a URL to your public GitHub repo</label>
      <TextField.Input size="3" type="url" name="url" onChange={changeHandler} defaultValue={data.url} />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default Form
