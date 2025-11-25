"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function PhoneInput({ value, onChange }: any) {
  return (
    <div className="flex gap-2">
      {/* Country Code */}
      <Select
        onValueChange={(code) => onChange({ ...value, code })}
        defaultValue={value?.code || "+234"}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="+234" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="+234">🇳🇬 +234</SelectItem>
          <SelectItem value="+1">🇺🇸 +1</SelectItem>
          <SelectItem value="+44">🇬🇧 +44</SelectItem>
          <SelectItem value="+233">🇬🇭 +233</SelectItem>
          <SelectItem value="+27">🇿🇦 +27</SelectItem>
        </SelectContent>
      </Select>

      {/* Phone Number */}
      <Input
        type="tel"
        placeholder="812 345 6789"
        value={value?.number || ""}
        onChange={(e) => onChange({ ...value, number: e.target.value })}
        className="flex-1"
      />
    </div>
  );
}
