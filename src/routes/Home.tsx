import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootModel } from 'store';
import demo from 'assets/demo.png';

export default function Home() {
  const count = useSelector((state: RootModel) => state.count);
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      {count}
      <img width={20} src={demo} alt='' />
      <h1 onClick={() => dispatch({ type: 'count/incrementAsync', payload: 2 })}>Home</h1>
      <ul>
        {invoices.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.number}?name=${item.name}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
const invoices = [
  {
    name: 'Santa Monica',
    number: 1995,
    amount: '$10,800',
    due: '12/05/1995',
  },
  {
    name: 'Stankonia',
    number: 2000,
    amount: '$8,000',
    due: '10/31/2000',
  },
  {
    name: 'Ocean Avenue',
    number: 2003,
    amount: '$9,500',
    due: '07/22/2003',
  },
  {
    name: 'Tubthumper',
    number: 1997,
    amount: '$14,000',
    due: '09/01/1997',
  },
  {
    name: 'Wide Open Spaces',
    number: 1998,
    amount: '$4,600',
    due: '01/27/2998',
  },
];
