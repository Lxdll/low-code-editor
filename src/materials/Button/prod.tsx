import { CommonComponentProps } from '@/types';
import { Button as AntdButton } from 'antd';

const Button = ({ type, text, styles, ...props }: CommonComponentProps) => {
  const { id, ...rest } = props;
  console.log(
    '%c [ id ]',
    'font-size:13px; background:pink; color:#bf2c9f;',
    id
  );

  return (
    <AntdButton type={type} style={styles} {...rest}>
      {text}
    </AntdButton>
  );
};

export default Button;
