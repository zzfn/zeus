import { Button, Card, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mutate } from 'swr';

const { Paragraph, Title } = Typography;

const ERROR_MESSAGE: Record<string, string> = {
  missing_discourse_payload: '缺少登录回调参数',
  invalid_discourse_payload: '登录回调校验失败',
  missing_nonce: '登录状态已失效，请重试',
  invalid_nonce: '登录状态已过期，请重新登录',
  user_sync_failed: '用户信息同步失败',
  token_issue_failed: '登录令牌生成失败',
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const error = searchParams.get('error');

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const storedRedirect = window.sessionStorage.getItem('post_login_redirect');
    const redirectTarget =
      storedRedirect && storedRedirect.startsWith('/') && !storedRedirect.startsWith('//')
        ? storedRedirect
        : '/home';

    mutate({ url: '/v1/app-users/me' });

    const timer = window.setTimeout(() => {
      window.sessionStorage.removeItem('post_login_redirect');
      navigate(redirectTarget, { replace: true });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [navigate, status]);

  const description =
    status === 'success'
      ? 'Discourse 登录成功，正在返回后台首页...'
      : ERROR_MESSAGE[error || ''] || '登录未完成，请重新尝试。';

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='max-w-md m-auto'>
        <div className='flex flex-col items-center gap-y-4 p-4 text-center'>
          <Title level={3} className='!mb-0'>
            {status === 'success' ? '登录成功' : '登录失败'}
          </Title>
          <Paragraph className='!mb-0 text-gray-500'>{description}</Paragraph>
          {status !== 'success' && (
            <Button type='primary' onClick={() => navigate('/login', { replace: true })}>
              返回登录页
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
