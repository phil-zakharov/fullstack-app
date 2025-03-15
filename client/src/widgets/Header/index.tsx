import { Avatar, Flex, Text } from '@radix-ui/themes';
import { AvatarIcon } from '@radix-ui/react-icons';

import style from './Header.module.css';

export const Header = () => {
  return (
    <Flex gap="2" p="2" justify='between'>
      <Text>MyApp</Text>
      <Avatar size="2" fallback={<AvatarIcon />} className={style.avatar} />
    </Flex>
  );
};
