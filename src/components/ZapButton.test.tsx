import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import { ZapButton } from './ZapButton';

// Mock the lightning payment hook
vi.mock('@/hooks/useLightningPayment', () => ({
  useLightningPayment: () => ({
    sendPayment: vi.fn(),
    isLoading: false,
  }),
}));

describe('ZapButton', () => {
  it('renders with default text', async () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com" />
      </TestApp>
    );

    expect(await screen.findByText('Zap ⚡')).toBeInTheDocument();
  });

  it('renders with custom children', async () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com">
          Custom Zap Text
        </ZapButton>
      </TestApp>
    );

    expect(await screen.findByText('Custom Zap Text')).toBeInTheDocument();
  });

  it('opens dialog when showDialog is true', async () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com" showDialog={true} />
      </TestApp>
    );

    const button = await screen.findByText('Zap ⚡');
    fireEvent.click(button);

    expect(screen.getByText('Send Lightning Payment')).toBeInTheDocument();
  });

  it('calls onZap callback when provided', async () => {
    const onZapMock = vi.fn();

    render(
      <TestApp>
        <ZapButton
          recipient="test@example.com"
          showDialog={false}
          onZap={onZapMock}
        />
      </TestApp>
    );

    const button = await screen.findByText('Zap ⚡');
    fireEvent.click(button);

    expect(onZapMock).toHaveBeenCalled();
  });
});
