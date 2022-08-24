import { Button, Card } from 'antd';
import {
  Funnel,
  FunnelChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { getHomeOverview } from '../service/home';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data = {} } = useQuery(['getHomeOverview'], getHomeOverview);
  return (
    <>
      <Card title={'快捷操作'}>
        <Button>清除缓存</Button>
      </Card>
      <div className={'grid grid-cols-2 gap-2'}>
        <Card title={'文章分类'}>
          <ResponsiveContainer height={200}>
            <PieChart width={200} height={200}>
              <Pie
                nameKey='tag'
                dataKey='count'
                isAnimationActive={false}
                data={data.data?.tags ?? []}
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8dd1e1'
                label
              />
              <Tooltip />
              <LabelList position='right' fill={'#000'} stroke='none' dataKey='tag' />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title={'热门搜索'}>
          <ResponsiveContainer height={200}>
            <FunnelChart width={200} height={200}>
              <Tooltip />
              <Funnel
                fill={'#83a6ed'}
                dataKey='score'
                data={data.data?.searchKeywords.slice(0, 10) ?? []}
                isAnimationActive={false}
              >
                <LabelList position='right' fill={'#000'} stroke='none' dataKey='value' />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
