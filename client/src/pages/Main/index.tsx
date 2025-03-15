import { Button } from '@radix-ui/themes';
import useSWR from 'swr';

export default function MainPage() {
  const { data } = useSWR(`api/user/bla/foo`);

  return (
    <div>
      MainPage ,<br />
      {data?.data}
      <Button>bla</Button>
    </div>
  );
}
