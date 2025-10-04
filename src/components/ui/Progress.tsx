import React from "react";
import { colors } from "../../constants/colors";

export default function Progress({ value }:{ value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-zinc-200">
      <div className={`h-2 rounded-full bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
