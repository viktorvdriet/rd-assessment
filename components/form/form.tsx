import styles from './form.module.scss'

import { ChangeEvent, FC, FormEvent, useState } from 'react'

type FormData = {
  url: string;
}

const Form: FC = () => {
  const [data, setData] = useState<FormData>({
    url: "https://github.com/vercel/next.js"
  });

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handlerSubmit}>
      <label>Please provide a URL to your public GitHub repo</label>
      <input type="url" name="url" onChange={inputChange} defaultValue={data.url} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
