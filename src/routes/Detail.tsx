import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function Detail() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>{JSON.stringify(params)}</h2>
      <h2>{JSON.stringify(location)}</h2>
      <h2>{JSON.stringify(searchParams.getAll('name'))}</h2>
      <button onClick={() => navigate('..')}>back</button>
    </main>
  );
}
