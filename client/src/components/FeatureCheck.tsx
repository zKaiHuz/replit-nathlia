import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCheckProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureCheck({ children, className }: FeatureCheckProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="flex-shrink-0 mt-1">
        <div className="bg-green-500/20 p-1 rounded-full">
          <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
        </div>
      </div>
      <p className="text-zinc-300 font-medium leading-relaxed">
        {children}
      </p>
    </div>
  );
}
