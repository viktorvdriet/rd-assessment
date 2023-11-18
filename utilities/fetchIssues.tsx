import axios from 'axios';

export const fetchIssues = async (
  org: string,
  repo: string,
  page: number = 1,
  perPage: number = 10
) => {
  const url = `https://api.github.com/repos/${org}/${repo}/issues`;
  const params = { page, per_page: perPage };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};