import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import React from "react";

function DebouncedInput({ debounceMs = 300, ...props }: React.ComponentProps<"input"> & { debounceMs: number }) {
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [localValue, setLocalValue] = React.useState(props.value);

  const debouncedValue = useDebounce(localValue || "", debounceMs);

  React.useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    props.onChange?.({ target: { value: debouncedValue } } as React.ChangeEvent<HTMLInputElement>);
  }, [debouncedValue]);

  return <Input {...props} value={localValue} onChange={(e) => setLocalValue(e.target.value)} />;
}

export { DebouncedInput };
