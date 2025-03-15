import { useAppSelector } from '../useApp';

export const useUserStore = () => useAppSelector((store) => store.user)