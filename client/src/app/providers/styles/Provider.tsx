import '@radix-ui/themes/styles.css';
import './index.css';

import { Theme } from '@radix-ui/themes';

export default function StylesProvider({ children }: React.PropsWithChildren) {
  return <Theme accentColor='amber'>{children}</Theme>;
}
