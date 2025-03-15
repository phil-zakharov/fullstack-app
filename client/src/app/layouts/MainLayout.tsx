import { Container } from '@mui/material';
import { Header } from '~/widgets/Header';

export function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', p: 0 }}
    >
      <Header />
      {children}
    </Container>
  );
}
