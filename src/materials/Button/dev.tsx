import { CommonComponentProps } from '@/types';
import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';

export interface ButtonProps extends CommonComponentProps {
  type: ButtonType;
  text: string;
}

const Button = ({ id, type, styles, text }: ButtonProps) => {
  return (
    <AntdButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
