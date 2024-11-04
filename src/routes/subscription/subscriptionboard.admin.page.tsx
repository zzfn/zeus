import { Card, Tag, Space, Dropdown } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { EllipsisOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import type { Task } from './types';
import dayjs from 'dayjs';

interface SubscriptionBoardProps {
  tasks?: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (taskId: number, newStatus: string) => void;
}

const SubscriptionBoardPage = ({
  tasks = [],
  onEdit,
  onDelete,
  onStatusChange,
}: SubscriptionBoardProps) => {
  const [columns, setColumns] = useState({
    PENDING: {
      title: '待处理',
      items: tasks.filter((task) => task.status === 'PENDING') || [],
    },
    ONGOING: {
      title: '进行中',
      items: tasks.filter((task) => task.status === 'ONGOING') || [],
    },
    COMPLETED: {
      title: '已完成',
      items: tasks.filter((task) => task.status === 'COMPLETED') || [],
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

      // 通知父组件状态变化，使用新的状态值
      onStatusChange?.(removed.id, destination.droppableId as 'PENDING' | 'ONGOING' | 'COMPLETED');
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
              { key: '1', label: '编辑', onClick: () => onEdit?.(task) },
              { key: '2', label: '删除', danger: true, onClick: () => onDelete?.(task) },
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
          <CalendarOutlined />{' '}
          {task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD HH:mm:ss') : '-'}
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid grid-cols-3 gap-4'>
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='font-medium mb-4'>{column.title}</h2>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='min-h-[500px]'>
                  {column.items.map((task, index) => (
                    // eslint-disable-next-line react/prop-types
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
  );
};

export default SubscriptionBoardPage;
