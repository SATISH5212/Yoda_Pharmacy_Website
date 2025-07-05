import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";

interface Country {
  value: string;
  label: string;
  code: string;
  maxLength: number;
}

const countries: Country[] = [
  { value: "ar", label: "Argentina", code: "54", maxLength: 10 },
  { value: "au", label: "Australia", code: "61", maxLength: 9 },
  { value: "br", label: "Brazil", code: "55", maxLength: 11 },
  { value: "ca", label: "Canada", code: "1", maxLength: 10 },
  { value: "cn", label: "China", code: "86", maxLength: 11 },
  { value: "fr", label: "France", code: "33", maxLength: 9 },
  { value: "de", label: "Germany", code: "49", maxLength: 11 },
  { value: "in", label: "India", code: "91", maxLength: 10 },
  { value: "it", label: "Italy", code: "39", maxLength: 10 },
  { value: "jp", label: "Japan", code: "81", maxLength: 10 },
  { value: "mx", label: "Mexico", code: "52", maxLength: 10 },
  { value: "ru", label: "Russia", code: "7", maxLength: 10 },
  { value: "za", label: "South Africa", code: "27", maxLength: 9 },
  { value: "kr", label: "South Korea", code: "82", maxLength: 11 },
  { value: "es", label: "Spain", code: "34", maxLength: 9 },
  { value: "gb", label: "United Kingdom", code: "44", maxLength: 10 },
  { value: "us", label: "United States", code: "1", maxLength: 10 },
];

type PhoneInputProps = {
  onChange?: (value: string) => void;
  value?: string;
  placeholder: string;
  className: string;
  defaultCountry: string;
};

export function PhoneInput({
  onChange,
  value,
  placeholder,
  className,
  defaultCountry,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(defaultCountry);
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (value) {
      const cleanValue = value.replace(/\D/g, ""); // Remove all non-digits
      // First, try to match with the currently selected country
      const currentCountry = countries.find((c) => c.value === selectedCountry);
      if (
        currentCountry &&
        cleanValue.startsWith(currentCountry.code) &&
        cleanValue.length <=
          currentCountry.code.length + currentCountry.maxLength
      ) {
        setPhoneNumber(cleanValue.slice(currentCountry.code.length));
      } else {
        // If no match with current country, find a new matching country
        const matchingCountry = countries.find(
          (c) =>
            cleanValue.startsWith(c.code) &&
            cleanValue.length <= c.code.length + c.maxLength
        );
        if (matchingCountry) {
          setSelectedCountry(matchingCountry.value);
          setPhoneNumber(cleanValue.slice(matchingCountry.code.length));
        } else {
          setPhoneNumber(cleanValue);
        }
      }
    } else {
      setPhoneNumber("");
    }
  }, [value, selectedCountry]);

  const handleSearch = React.useCallback((searchTerm: string) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = countries.filter(
      (country) =>
        country.label.toLowerCase().includes(lowerSearchTerm) ||
        country.code.includes(lowerSearchTerm) ||
        country.value.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredCountries(filtered);
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const country = countries.find((c) => c.value === selectedCountry);
    const maxLength = country?.maxLength || 15;

    if (input.length <= maxLength) {
      setPhoneNumber(input);
      const fullPhoneNumber = input ? `+${country?.code}${input}` : "";
      onChange?.(fullPhoneNumber);
    }
  };

  const currentCountry =
    countries.find((c) => c.value === selectedCountry) ||
    countries.find((c) => c.value === defaultCountry);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[91px] flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={`https://flagcdn.com/w20/${currentCountry?.value.toLowerCase()}.png`}
                  alt={`${currentCountry?.label} flag`}
                  className="h-4 w-5 mr-0.5"
                />
                <span>+{currentCountry?.code}</span>
              </div>
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search country..."
                onValueChange={handleSearch}
              />
              <CommandEmpty className="px-2 bg-white">
                No country found.
              </CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {filteredCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={() => {
                        setSelectedCountry(country.value);
                        setPhoneNumber("");
                        setOpen(false);
                        onChange?.(`+${country.code}`);
                      }}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                        alt={`${country.label} flag`}
                        className="mr-2 h-4 w-4"
                      />
                      {country.label} (+{country.code})
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCountry === country.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex-1">
          <Input
            type="tel"
            placeholder={placeholder}
            value={phoneNumber}
            className={className}
            onChange={handlePhoneNumberChange}
            maxLength={currentCountry?.maxLength || 15}
          />
        </div>
      </div>
    </div>
  );
}
