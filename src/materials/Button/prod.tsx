import { CommonComponentProps } from '@/types';
import { Button as AntdButton } from 'antd';

const Button = ({ type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
