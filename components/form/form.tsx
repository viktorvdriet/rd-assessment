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
      <input type="url" name="url" onChange={changeHandler} defaultValue={data.url} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
