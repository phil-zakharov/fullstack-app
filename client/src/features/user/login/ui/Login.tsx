import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '~/shared/api/user';
import { LoginForm } from '../types';
import { loginSch } from '../model/validation';
import { RequestError } from '~/shared/request_types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Login = ({ isOpen, onClose }: Props) => {
  const [login, { data, isError, error }] = useLoginMutation();
  console.log(' data:', data, error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: loginSch,
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}
          onSubmit={handleSubmit(login)}
        >
          <TextField
            variant="outlined"
            label="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            variant="outlined"
            label="password"
            error={!!errors.password}
            type="password"
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit">Submit</Button>
        </Box>

        {isError && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            {(error as RequestError)?.data?.error}
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};
