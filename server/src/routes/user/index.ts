import { userController } from '../../controllers/user/index.ts'
import { Route } from '../types.ts'

export const userRoutes: Route = {
  signup: {
    POST: userController.sign_up
  },
  login: {
    POST: userController.log_in
  },
  logout: {
    GET: () => {}
  }
}
