import { Bar } from '@ant-design/plots';
import { CardProps, Card } from 'antd';
import { Text } from '../text';

type Plan = {
  TAG: string;
  COUNT: number;
};

type BarProps = {
  data: Plan[];
};

const BarChart = ({ data }: BarProps) => {
  
  const config = {
    data,
    xField: 'COUNT',
    yField: 'TAG',
    seriesField: 'TAG',
    legend: {
      position: 'top-left',
    },
  };
  // @ts-ignore
  return <Bar {...config}/>;
};

type Props = {
  data: any;
  max:any;
  title:any;
} & CardProps;

export const BarChartPro = ({ data, max, title }: Props) => {
  data = data.sort((a: { COUNT: number }, b: { COUNT: number }) => b.COUNT - a.COUNT).slice(0, max)
  return (
    <Card
    style={{height:'100%'}}
    headStyle={{padding: '8px 16px'}}
    bodyStyle={{padding: '24px 24px 0 24px'}}
    title={
        <div style={{
            display:'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <Text size="sm" style={{marginLeft:'0.5rem'}}>
                {title}
            </Text>
        </div>
    }
    >
        <BarChart data={data || []}/>
    </Card>
  );
};