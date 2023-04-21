import yayJpg from '../assets/yay.jpg';
import { Button } from 'antd';
import { useNavigate } from 'umi';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <Button onClick={()=>{navigate("/docs")}}>Button</Button>
    </div>
  );
}
