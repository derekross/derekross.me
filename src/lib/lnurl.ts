// LNURL-pay utilities
export interface LNURLPayResponse {
  callback: string;
  maxSendable: number;
  minSendable: number;
  metadata: string;
  tag: 'payRequest';
  commentAllowed?: number;
  payerData?: {
    name?: { mandatory: boolean };
    pubkey?: { mandatory: boolean };
    identifier?: { mandatory: boolean };
    email?: { mandatory: boolean };
    auth?: { mandatory: boolean; k1: string };
  };
}

export interface LNURLPayCallbackResponse {
  pr: string; // Lightning payment request (invoice)
  successAction?: {
    tag: 'message' | 'url' | 'aes';
    message?: string;
    url?: string;
    description?: string;
    ciphertext?: string;
    iv?: string;
  };
  disposable?: boolean;
  routes?: unknown[];
}

export async function fetchLNURLPayInfo(url: string): Promise<LNURLPayResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch LNURL info: ${response.status} ${response.statusText}. Response: ${text.substring(0, 100)}...`);
  }

  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON response but got ${contentType}. Response: ${text.substring(0, 100)}...`);
  }

  const data = await response.json();

  if (data.tag !== 'payRequest') {
    throw new Error(`Invalid LNURL-pay response: expected tag 'payRequest', got '${data.tag}'. Full response: ${JSON.stringify(data)}`);
  }

  return data as LNURLPayResponse;
}

export async function requestLNURLPayInvoice(
  callbackUrl: string,
  amountMsats: number,
  comment?: string
): Promise<LNURLPayCallbackResponse> {
  const url = new URL(callbackUrl);
  url.searchParams.set('amount', amountMsats.toString());

  if (comment) {
    url.searchParams.set('comment', comment);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to get invoice: ${response.status} ${response.statusText}. Response: ${text.substring(0, 100)}...`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON response but got ${contentType}. Response: ${text.substring(0, 100)}...`);
  }

  const data = await response.json();

  if (data.status === 'ERROR') {
    throw new Error(data.reason || 'LNURL callback failed');
  }

  if (!data.pr) {
    throw new Error('No payment request in response');
  }

  return data as LNURLPayCallbackResponse;
}