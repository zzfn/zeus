import { Select } from 'antd';

const SelectCode = (props: any) => {
  const { source = [] } = props;
  return (
    <Select
      {...props}
      allowClear
      showSearch
      style={{ width: '100%' }}
      filterOption={(input, option: any) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {source.map((item: any) => (
        <Select.Option key={item.id} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};
export default SelectCode;
