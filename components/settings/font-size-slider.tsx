import { Slider } from "@/components/ui/slider";

interface FontSizeSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function FontSizeSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: FontSizeSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
          {label}
        </label>
        <span className="text-xs tabular-nums text-gold font-medium">
          {value}px
        </span>
      </div>
      <Slider
        id={id}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([newValue]) => onChange(newValue)}
      />
    </div>
  );
}
