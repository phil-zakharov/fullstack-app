import { useAppSelector } from '../useApp';

export const useUserSelector = () => useAppSelector((store) => store.user)