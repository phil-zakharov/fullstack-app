import { Flex } from '@radix-ui/themes';
import { Header } from '~/widgets/Header';

export function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <Flex direction='column'>
      <Header />
      {children}
    </Flex>
  );
}
