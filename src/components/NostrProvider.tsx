import React, { useEffect, useRef } from 'react';
import { NostrEvent, NPool, NRelay1 } from '@nostrify/nostrify';
import { NostrContext } from '@nostrify/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppContext } from '@/hooks/useAppContext';

interface NostrProviderProps {
  children: React.ReactNode;
}

const NostrProvider: React.FC<NostrProviderProps> = (props) => {
  const { children } = props;
  const { config, presetRelays } = useAppContext();

  const queryClient = useQueryClient();

  // Create NPool instance only once
  const pool = useRef<NPool | undefined>(undefined);

  // Use refs so the pool always has the latest data
  const relayUrl = useRef<string>(config.relayUrl);
  const useAllRelays = useRef<boolean>(config.useAllRelays);

  // Update refs when config changes
  useEffect(() => {
    relayUrl.current = config.relayUrl;
    useAllRelays.current = config.useAllRelays;
    queryClient.resetQueries();
  }, [config.relayUrl, config.useAllRelays, queryClient]);

  // Initialize NPool only once
  if (!pool.current) {
    pool.current = new NPool({
      open(url: string) {
        return new NRelay1(url);
      },
      reqRouter(filters) {
        if (useAllRelays.current && presetRelays) {
          // When useAllRelays is enabled, read from all preset relays
          const relayMap = new Map<string, typeof filters>();
          
          // Add all preset relays
          for (const relay of presetRelays) {
            relayMap.set(relay.url, filters);
          }
          
          // Ensure the currently selected relay is also included
          relayMap.set(relayUrl.current, filters);
          
          return relayMap;
        } else {
          // Single relay mode - only use the selected relay
          return new Map([[relayUrl.current, filters]]);
        }
      },
      eventRouter(_event: NostrEvent) {
        // Publish to the selected relay
        const allRelays = new Set<string>([relayUrl.current]);

        // Also publish to the preset relays, capped to 6
        for (const { url } of (presetRelays ?? [])) {
          allRelays.add(url);

          if (allRelays.size >= 6) {
            break;
          }
        }

        return [...allRelays];
      },
    });
  }

  return (
    <NostrContext.Provider value={{ nostr: pool.current }}>
      {children}
    </NostrContext.Provider>
  );
};

export default NostrProvider;