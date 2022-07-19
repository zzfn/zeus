import { Button, Card } from 'antd';
import { Pie, WordCloud } from '@ant-design/charts';
import { getHomeOverview } from '../service/home';
import { useQuery } from 'react-query';

export default function Home() {
  const { data = {} } = useQuery(['getHomeOverview'], getHomeOverview);
  return (
    <>
      <Card title={'快捷操作'}>
        <Button>清除缓存</Button>
      </Card>
      <div className={'grid grid-cols-2 gap-2'}>
        <Card title={'文章分类'}>
          <Pie
            label={{
              type: 'outer',
              content: '{name} {percentage}',
            }}
            radius={0.9}
            data={data.data?.tags ?? []}
            angleField={'count'}
            colorField={'tag'}
          />
        </Card>
        <Card title={'热门搜索'}>
          <WordCloud
            autoFit={false}
            height={235}
            data={data.data?.searchKeywords ?? []}
            weightField={'score'}
            wordField={'value'}
          />
        </Card>
      </div>
    </>
  );
}
