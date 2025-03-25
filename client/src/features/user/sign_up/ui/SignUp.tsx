import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '~/features/user/api';
import { SignUpForm } from '../types';
import CheckIcon from '@mui/icons-material/Check';
import { signUpSch } from '../model/validation';
import { RequestError } from '~/shared/request_types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUp = ({ isOpen, onClose }: Props) => {
  const [signUp, { isError, error }] = useSignUpMutation();

  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: signUpSch,
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp(data);
      onClose();
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Sign up</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField variant="outlined" label="name" {...register('name')} />
          <TextField variant="outlined" label="email" {...register('email')} />
          <TextField
            variant="outlined"
            label="password"
            type="password"
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
