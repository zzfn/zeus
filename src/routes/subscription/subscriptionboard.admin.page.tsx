import { Card, Tag, Button, Space, Avatar, Dropdown } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { EllipsisOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import type { Task } from './types';

const SubscriptionBoardPage = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: '待处理',
      items: [{ id: 1, title: '待处理', type: 1, dueDate: '2024-01-01', amount: 100 }] as Task[],
    },
    inProgress: {
      title: '进行中',
      items: [] as Task[],
    },
    completed: {
      title: '已完成',
      items: [] as Task[],
    },
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as keyof typeof columns];
      const destColumn = columns[destination.droppableId as keyof typeof columns];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId as keyof typeof columns];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card
      size='small'
      className='mb-3 shadow-sm'
      actions={[
        <Dropdown
          key='dropdown'
          menu={{
            items: [
              { key: '1', label: '编辑' },
              { key: '2', label: '删除', danger: true },
            ],
          }}
          trigger={['click']}
        >
          <EllipsisOutlined key='ellipsis' />
        </Dropdown>,
      ]}
    >
      <div className='mb-2'>
        <Tag color={task.type === 1 ? 'blue' : 'green'}>
          {task.type === 1 ? '待办事项' : '订阅'}
        </Tag>
      </div>
      <div className='font-medium mb-2'>{task.title}</div>
      <div className='text-gray-500 text-sm flex items-center justify-between'>
        <Space>
          <CalendarOutlined /> {task.dueDate}
        </Space>
        {task.amount && (
          <Space>
            <DollarOutlined /> {task.amount}
          </Space>
        )}
      </div>
    </Card>
  );

  return (
    <div className='p-6'>
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>任务看板</h1>
        <Button type='primary'>新建任务</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-3 gap-4'>
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className='bg-gray-50 p-4 rounded-lg'>
              <h2 className='font-medium mb-4'>{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='min-h-[500px]'
                  >
                    {column.items.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SubscriptionBoardPage;
