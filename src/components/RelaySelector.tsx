import { Check, ChevronsUpDown, Plus, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { PRESET_RELAYS } from "@/lib/appRelays";

interface RelaySelectorProps {
  className?: string;
}

/** Normalize a relay URL by adding wss:// if missing and ensuring a trailing slash. */
function normalizeRelayUrl(url: string): string {
  let trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (!trimmed.includes("://")) {
    trimmed = `wss://${trimmed}`;
  }
  try {
    return new URL(trimmed).toString();
  } catch {
    return trimmed;
  }
}

/**
 * Lets the user switch which relay the app reads from. Selecting a relay
 * replaces the active NIP-65 read/write list with that single relay, which is
 * the useful action behind "try another relay?" empty states.
 */
export function RelaySelector(props: RelaySelectorProps) {
  const { className } = props;
  const { config, updateConfig } = useAppContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // The first read relay represents the current primary source.
  const currentUrl = config.relayMetadata.relays.find((r) => r.read)?.url
    ?? config.relayMetadata.relays[0]?.url
    ?? "";

  const setRelay = (url: string) => {
    const normalized = normalizeRelayUrl(url);
    updateConfig((current) => ({
      ...current,
      relayMetadata: {
        relays: [{ url: normalized, read: true, write: true }],
        updatedAt: 0,
      },
    }));
    setOpen(false);
    setInputValue("");
  };

  const selectedOption = PRESET_RELAYS.find((o) => o.url === currentUrl);

  const isValidRelayInput = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    try {
      new URL(normalizeRelayUrl(trimmed));
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span className="truncate">
              {selectedOption
                ? selectedOption.name
                : currentUrl
                  ? currentUrl.replace(/^wss?:\/\//, "").replace(/\/$/, "")
                  : "Select relay..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search relays or type URL..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              {inputValue && isValidRelayInput(inputValue) ? (
                <CommandItem onSelect={() => setRelay(inputValue)} className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Add custom relay</span>
                    <span className="text-xs text-muted-foreground">
                      {normalizeRelayUrl(inputValue)}
                    </span>
                  </div>
                </CommandItem>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {inputValue ? "Invalid relay URL" : "No relay found."}
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {PRESET_RELAYS.filter(
                (o) =>
                  !inputValue ||
                  o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  o.url.toLowerCase().includes(inputValue.toLowerCase()),
              ).map((option) => (
                <CommandItem
                  key={option.url}
                  value={option.url}
                  onSelect={(currentValue) => setRelay(currentValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentUrl === option.url ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{option.name}</span>
                    <span className="text-xs text-muted-foreground">{option.url}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
