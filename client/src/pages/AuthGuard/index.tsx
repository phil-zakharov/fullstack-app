import { CircularProgress } from '@mui/material';
import { useUserSelector } from '~/shared/store/user';

export const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const { isAuth } = useUserSelector();
  if (isAuth) {
    return children;
  }
  return <CircularProgress size={100} />
};
