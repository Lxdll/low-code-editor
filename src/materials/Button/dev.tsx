import { CommonComponentProps } from '@/types';
import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';
import { useDrag } from 'react-dnd';

export interface ButtonProps extends CommonComponentProps {
  type: ButtonType;
  text: string;
}

const Button = ({ id, type, styles, text }: ButtonProps) => {
  const [, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id,
    },
  });

  return (
    <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
