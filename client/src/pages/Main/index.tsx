import { Button } from '@mui/material';
import { useLazyGetAllQuery } from '~/features/post/api';

export default function MainPage() {
  const [getAll] = useLazyGetAllQuery()
  return <div>MainPage
    <Button onClick={() => getAll('')}>get all</Button>
  </div>;
}
