import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useDebouncedValue } from "../hooks/useDebouncedValue"
import { useEffect } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar documentos..." }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebouncedValue(localValue, 300)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
        aria-label="Buscar documentos"
      />
    </div>
  )
}
