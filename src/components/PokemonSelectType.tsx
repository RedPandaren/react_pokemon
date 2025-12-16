import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface TypeSelectProps {
  types: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function TypeSelect({
  types,
  placeholder = "Choose type",
  value,
  onChange,
}: TypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full min-w-45 justify-between text-white bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <SelectValue className="text-white" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
        {types.map((type) => (
          <SelectItem
            key={type}
            value={type}
            className="hover:bg-blue-100 rounded-none px-2 py-1 text-white bg-black"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
