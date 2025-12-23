import { Input } from "@/components/ui/input";
interface PokemonTextSearchProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function PokemonTextSearch({
  value,
  placeholder = "Search Pokemon",
  onChange,
}: PokemonTextSearchProps) {
  return (
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="flex-1 ml-1 max-w-md lg:max-w-lg xl:max-w-xl px-3 h-9 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
