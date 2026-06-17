import type { RelayMetadata } from '@/contexts/AppContext';

/**
 * App default relays. Used as the initial `relayMetadata` for new users and as
 * a fallback when the user has no NIP-65 relay list configured (e.g. during
 * nostrconnect handshakes before any user relays have been loaded).
 */
export const APP_RELAYS: RelayMetadata = {
  relays: [
    { url: 'wss://nostr-relay.derekross.me/', read: true, write: true },
    { url: 'wss://relay.primal.net/', read: true, write: true },
    { url: 'wss://nos.lol/', read: true, write: true },
    { url: 'wss://relay.ditto.pub/', read: true, write: true },
    { url: 'wss://nostr.wine/', read: true, write: true },
  ],
  updatedAt: 0,
};

/** Preset relays shown in the RelaySelector for quickly switching read sources. */
export const PRESET_RELAYS: { url: string; name: string }[] = [
  { url: 'wss://nostr-relay.derekross.me/', name: 'Derek Ross' },
  { url: 'wss://relay.primal.net/', name: 'Primal' },
  { url: 'wss://nos.lol/', name: 'nos.lol' },
  { url: 'wss://relay.ditto.pub/', name: 'Ditto' },
  { url: 'wss://nostr.wine/', name: 'nostr.wine' },
  { url: 'wss://relay.damus.io/', name: 'Damus' },
];
