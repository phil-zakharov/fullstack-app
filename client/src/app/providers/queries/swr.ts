import { SWRConfiguration } from 'swr';
import { fetcher } from './fetcher';

export const SWRProviderConfig: SWRConfiguration = {
  fetcher: fetcher
}