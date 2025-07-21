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
  it('renders with default text', () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com" />
      </TestApp>
    );

    expect(screen.getByText('Zap ⚡')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com">
          Custom Zap Text
        </ZapButton>
      </TestApp>
    );

    expect(screen.getByText('Custom Zap Text')).toBeInTheDocument();
  });

  it('opens dialog when showDialog is true', () => {
    render(
      <TestApp>
        <ZapButton recipient="test@example.com" showDialog={true} />
      </TestApp>
    );

    const button = screen.getByText('Zap ⚡');
    fireEvent.click(button);

    expect(screen.getByText('Send Lightning Payment')).toBeInTheDocument();
  });

  it('calls onZap callback when provided', () => {
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

    const button = screen.getByText('Zap ⚡');
    fireEvent.click(button);

    expect(onZapMock).toHaveBeenCalled();
  });
});