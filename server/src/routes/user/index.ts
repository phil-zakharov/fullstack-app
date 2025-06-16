import { userController } from '../../controllers/user/index.ts';
import { Route } from '../types.ts';

export const userRoutes: Route = {
  signup: {
    POST: userController.sign_up,
  },
  login: {
    POST: userController.log_in,
  },
  logout: {
    GET: userController.log_out,
  },
  refresh: {
    GET: userController.refresh,
  },
  'auto-login': {
    GET: userController.auto_login,
  },
  all: {
    GET: userController.all,
  },
  friend: {
    GET: userController.get_user_friends,
    PATCH: userController.add_friend,
  },
};
