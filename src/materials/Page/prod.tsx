import { CommonComponentProps } from '@/types';

function Page({ children, styles }: CommonComponentProps) {
  return (
    <div className="p-[20px]" style={{ ...styles }}>
      {children}
    </div>
  );
}

export default Page;
