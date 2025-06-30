import { useState } from 'react';
import { Card, InputNumber, Button, Typography, Space, Divider, Alert, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CalculationResult {
  annualReturnRate: number;
  totalReturn: number;
  profit: number;
}

const AnnualReturnCalculator = () => {
  const [principal, setPrincipal] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateAnnualReturn = () => {
    if (!principal || !profit || !days) {
      setError('请填写所有必填字段');
      return;
    }

    if (principal <= 0 || profit < 0 || days <= 0) {
      setError('请输入有效的数值');
      return;
    }

    // 年化收益率 = (收益 / 本金) * (365 / 投资天数) * 100%
    const annualReturnRate = (profit / principal) * (365 / days) * 100;
    const totalReturn = principal + profit;

    setResult({
      annualReturnRate,
      totalReturn,
      profit,
    });
    setError('');
  };

  const resetForm = () => {
    setPrincipal(null);
    setProfit(null);
    setDays(null);
    setResult(null);
    setError('');
  };

  return (
    <Card className='shadow-sm'>
      <Space direction='vertical' size='large' className='w-full'>
        <div>
          <Title level={4} className='!mb-1'>
            <CalculatorOutlined className='mr-2' />
            收益年化计算器
          </Title>
          <Text type='secondary'>输入本金、收益和投资天数，计算年化收益率</Text>
        </div>

        {error && <Alert message={error} type='error' showIcon closable />}

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div>
              <Text strong>本金 (元)</Text>
              <InputNumber
                className='w-full mt-2'
                placeholder='请输入本金金额'
                value={principal}
                onChange={setPrincipal}
                min={0}
                precision={2}
                addonAfter='元'
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div>
              <Text strong>收益 (元)</Text>
              <InputNumber
                className='w-full mt-2'
                placeholder='请输入收益金额'
                value={profit}
                onChange={setProfit}
                min={0}
                precision={2}
                addonAfter='元'
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div>
              <Text strong>投资天数</Text>
              <InputNumber
                className='w-full mt-2'
                placeholder='请输入投资天数'
                value={days}
                onChange={setDays}
                min={1}
                precision={0}
                addonAfter='天'
              />
            </div>
          </Col>
        </Row>

        <Space>
          <Button
            type='primary'
            icon={<CalculatorOutlined />}
            onClick={calculateAnnualReturn}
            size='large'
          >
            计算年化收益率
          </Button>
          <Button icon={<ReloadOutlined />} onClick={resetForm} size='large'>
            重置
          </Button>
        </Space>

        {result && (
          <>
            <Divider />
            <Card className='bg-blue-50 border-blue-200'>
              <Title level={5} className='text-blue-600 mb-4'>
                计算结果
              </Title>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={8}>
                  <div className='text-center'>
                    <Text type='secondary'>年化收益率</Text>
                    <div className='text-2xl font-bold text-blue-600 mt-1'>
                      {result.annualReturnRate.toFixed(2)}%
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className='text-center'>
                    <Text type='secondary'>总收益</Text>
                    <div className='text-2xl font-bold text-green-600 mt-1'>
                      {result.profit.toFixed(2)} 元
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className='text-center'>
                    <Text type='secondary'>总金额</Text>
                    <div className='text-2xl font-bold text-purple-600 mt-1'>
                      {result.totalReturn.toFixed(2)} 元
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </>
        )}

        <Divider />

        <div className='bg-gray-50 p-4 rounded-lg'>
          <Title level={5}>计算公式说明</Title>
          <Text>年化收益率 = (收益 ÷ 本金) × (365 ÷ 投资天数) × 100%</Text>
          <br />
          <Text type='secondary' className='text-sm'>
            注：此计算基于简单年化收益率公式，适用于短期投资。长期投资建议考虑复利效应。
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default AnnualReturnCalculator;
