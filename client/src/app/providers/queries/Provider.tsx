import { SWRProviderConfig } from './swr';
import { SWRConfig } from 'swr';

export default function QueriesProvider({ children }: React.PropsWithChildren) {
  return <SWRConfig value={SWRProviderConfig}>{children}</SWRConfig>;
}
