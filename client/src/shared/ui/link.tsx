import { Link as UiLink } from '@mui/material'
import { purple } from '@mui/material/colors'
import { LinkProps, Link as RouterLink } from 'react-router'


export const Link = ({ children, ...props}: LinkProps) => {
  return (
    <UiLink component={RouterLink} underline='none' sx={{ color: purple[50] }} {...props}>{children}</UiLink>
  )
}