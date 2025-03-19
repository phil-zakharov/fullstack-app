import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '~/shared/api/user';
import { SignUpForm } from '../types';
import { signUpSch } from '../model/validation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SignUp = ({ isOpen, onClose }: Props) => {
  const [signUp] = useSignUpMutation();

  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: signUpSch
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Sign up</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}
          onSubmit={handleSubmit(signUp)}
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
      </DialogContent>
    </Dialog>
  );
};
