import { Pie } from "@ant-design/plots";
import { Card } from 'antd';
import { Text } from '../text';

interface Props {
  data: any;
  title: any;
  max:any;
}

const CategoriesChart: React.FC<Props> = ({ data, title, max }) => {
  data = data.sort((a: { COUNT: number }, b: { COUNT: number }) => b.COUNT - a.COUNT).slice(0, max)
  const config:any = {
    appendPadding: 10,
    data,
    angleField: 'COUNT',
    colorField: 'TAG',
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '',
      style: {
        textAlign: 'center',
        fontSize: 16,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 18,
        },
        content: ``,
      },
    },
  };

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
        <Pie {...config} height={325}/>
    </Card>
  )
};

export default CategoriesChart;