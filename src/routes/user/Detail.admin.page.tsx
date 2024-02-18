import { Button, Descriptions, Input } from 'antd';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import useSWRMutation from 'swr/mutation';
import { mutateData } from '../../models/api';

const DetailAdminPage = () => {
  const { data = {} } = useSWR<any>({
    url: `/v1/config/site`,
  });
  const [formData, setFormData] = useState(data);
  const { trigger } = useSWRMutation(`/v1/config/site`, mutateData);
  useEffect(() => {
    setFormData(data);
  }, [data]);
  return (
    <Descriptions
      items={Object.keys(data).map((key) => ({
        key,
        label: key,
        children: (
          <Input
            onChange={(event) => {
              const newFormData = produce(formData, (draft: Record<any, any>) => {
                draft[key] = event.target.value;
              });
              setFormData(newFormData);
            }}
            value={formData[key]}
          />
        ),
      }))}
      title='Config'
      extra={
        <Button
          onClick={async () => {
            await trigger({
              body: formData,
              method: 'POST',
            });
          }}
          type='primary'
        >
          Save
        </Button>
      }
      bordered
    />
  );
};
export default DetailAdminPage;
