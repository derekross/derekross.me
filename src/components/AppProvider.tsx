import { ReactNode, useEffect } from 'react';
import { z } from 'zod';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AppContext, type AppConfig, type AppContextType, type Theme, type RelayMetadata, type BlossomServerMetadata } from '@/contexts/AppContext';

interface AppProviderProps {
  children: ReactNode;
  /** Application storage key */
  storageKey: string;
  /** Default app configuration */
  defaultConfig: AppConfig;
}

// Zod schema for RelayMetadata validation
const RelayMetadataSchema = z.object({
  relays: z.array(z.object({
    url: z.string().url(),
    read: z.boolean(),
    write: z.boolean(),
  })),
  updatedAt: z.number(),
}) satisfies z.ZodType<RelayMetadata>;

// Zod schema for BlossomServerMetadata validation
const BlossomServerMetadataSchema = z.object({
  servers: z.array(z.string().url()),
  updatedAt: z.number(),
}) satisfies z.ZodType<BlossomServerMetadata>;

// Zod schema for AppConfig validation
const AppConfigSchema = z.object({
  theme: z.enum(['dark', 'light', 'system']),
  relayMetadata: RelayMetadataSchema,
  blossomServerMetadata: BlossomServerMetadataSchema,
  useAppBlossomServers: z.boolean(),
}) satisfies z.ZodType<AppConfig>;

export function AppProvider(props: AppProviderProps) {
  const {
    children,
    storageKey,
    defaultConfig,
  } = props;

  // App configuration state with localStorage persistence
  const [rawConfig, setConfig] = useLocalStorage<Partial<AppConfig>>(
    storageKey,
    {},
    {
      serialize: JSON.stringify,
      deserialize: (value: string) => {
        const parsed = JSON.parse(value);
        return AppConfigSchema.partial().parse(parsed);
      }
    }
  );

  // Generic config updater with callback pattern
  const updateConfig = (updater: (currentConfig: Partial<AppConfig>) => Partial<AppConfig>) => {
    setConfig(updater);
  };

  const config = { ...defaultConfig, ...rawConfig };

  const appContextValue: AppContextType = {
    config,
    updateConfig,
  };

  // Apply theme effects to document
  useApplyTheme(config.theme);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Dark mode is the only supported theme. Force the `dark` class onto the
 * document root regardless of any previously stored preference.
 */
function useApplyTheme(_theme: Theme) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }, []);
}