import { Button, Card, Input, message } from 'antd';
import useSWRMutation from 'swr/mutation';
import { mutateData } from '../models/api';

export default function Home() {
  const { trigger } = useSWRMutation(`v1/articles/search/sync`, mutateData);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Card>
        <Button
          onClick={async () => {
            await trigger({
              method: 'get',
            });
            message.success('同步成功');
          }}
        >
          reset elastic article
        </Button>
      </Card>
      <Card>
        <Input />
        <Button
          onClick={async () => {
            await trigger({
              method: 'get',
            });
            message.success('同步成功');
          }}
        >
          reset tag
        </Button>
        <Button
          onClick={async () => {
            await trigger({
              method: 'get',
            });
            message.success('同步成功');
          }}
        >
          reset path
        </Button>
      </Card>
      {/*</Card>*/}
      {/*<Card>*/}
      {/*  <CardHeader>访客统计</CardHeader>*/}
      {/*  <CardBody>*/}
      {/*    <ResponsiveContainer height={200}>*/}
      {/*      <LineChart*/}
      {/*        width={500}*/}
      {/*        height={300}*/}
      {/*        data={records}*/}
      {/*        margin={{*/}
      {/*          top: 5,*/}
      {/*          right: 30,*/}
      {/*          left: 20,*/}
      {/*          bottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <CartesianGrid strokeDasharray='3 3' />*/}
      {/*        <XAxis dataKey='name' />*/}
      {/*        <YAxis />*/}
      {/*        <Tooltip />*/}
      {/*        <Legend />*/}
      {/*        <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />*/}
      {/*        <Line type='monotone' dataKey='uv' stroke='#82ca9d' />*/}
      {/*      </LineChart>*/}
      {/*    </ResponsiveContainer>*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}
      {/*<div className='grid grid-cols-2 gap-2'>*/}
      {/*  <Card title='文章分类'>*/}
      {/*    <ResponsiveContainer height={200}>*/}
      {/*      <PieChart width={200} height={200}>*/}
      {/*        <Pie*/}
      {/*          nameKey='tag'*/}
      {/*          dataKey='score'*/}
      {/*          isAnimationActive={false}*/}
      {/*          data={[]}*/}
      {/*          cx='50%'*/}
      {/*          cy='50%'*/}
      {/*          outerRadius={80}*/}
      {/*          fill='#8dd1e1'*/}
      {/*          label*/}
      {/*        />*/}
      {/*        <Tooltip />*/}
      {/*        <LabelList position='right' fill='#000' stroke='none' dataKey='value' />*/}
      {/*      </PieChart>*/}
      {/*    </ResponsiveContainer>*/}
      {/*  </Card>*/}
      {/*  <Card title='热门搜索'>*/}
      {/*    <ResponsiveContainer height={200}>*/}
      {/*      <FunnelChart width={200} height={200}>*/}
      {/*        <Tooltip />*/}
      {/*        <Funnel fill='#83a6ed' dataKey='score' data={[]} isAnimationActive={false}>*/}
      {/*          <LabelList position='right' fill='#000' stroke='none' dataKey='value' />*/}
      {/*        </Funnel>*/}
      {/*      </FunnelChart>*/}
      {/*    </ResponsiveContainer>*/}
      {/*  </Card>*/}
      {/*</div>*/}
    </>
  );
}
