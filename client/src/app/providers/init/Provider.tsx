import { useAutoLoginQuery } from '~/features/user/api'

export const InitProvider = ({ children }: React.PropsWithChildren) => {
  useAutoLoginQuery('')
  return children
}