import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

interface IDropDownPoperProps {
    data: any[] | string[];
    onSelect?: (item: any | null) => void;
    type: 'robots' | 'missions' | 'fields' | 'rowPattren';
    isLoading: boolean;
    value?: string;
}

const DropDownPoper: React.FC<IDropDownPoperProps> = (props) => {
    const { data, onSelect, type, isLoading } = props;

    const [open, setOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<any | null>(null);

    const getTypeConfig = (type: 'robots' | 'missions' | 'fields' | 'rowPattren') => {
        const configs: Record<'robots' | 'missions' | 'fields' | 'rowPattren', {
            placeholder: string;
            searchPlaceholder: string;
            emptyMessage: string;
            displayKey: string;
            label: string;
        }> = {
            robots: {
                placeholder: "Select Robot",
                searchPlaceholder: "Search Robots",
                emptyMessage: "No Robots found",
                displayKey: "robot_name",
                label: "Robot"
            },
            missions: {
                placeholder: "Select Mission",
                searchPlaceholder: "Search Missions",
                emptyMessage: "No Missions found",
                displayKey: "mission_name",
                label: "Mission"
            },
            fields: {
                placeholder: "Select Field",
                searchPlaceholder: "Search Fields",
                emptyMessage: "No Fields found",
                displayKey: "field_name",
                label: "Field"
            },
            rowPattren: {
                placeholder: "Select Pattern Type",
                searchPlaceholder: "Search Pattern Types",
                emptyMessage: "No Pattern Types found",
                displayKey: "pattren_type",
                label: "Pattern Type"
            }
        };
        return configs[type];
    };

    const config = getTypeConfig(type);

    const getDisplayValue = (item: any) => {
        if (typeof item === "string") {
            return item;
        }
        return item[config.displayKey] || item.name || item.toString();
    };

    const getItemId = (item: any) => {
        if (typeof item === "string") {
            return item;
        }
        return item.id?.toString() || item[config.displayKey] || item;
    };

    const handleSelectItem = (itemId: string) => {
        const selected = data.find((item) => {
            return getItemId(item) === itemId;
        });

        setSelectedField(selected || null);
        onSelect?.(selected || null);
        setOpen(false);
    };

    const handleClearSelection = () => {
        setSelectedField(null);
        onSelect?.(null);
    };

    return (
        <div className="w-[200px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="relative w-full h-[35px] justify-between rounded-md border text-sm font-normal text-[#00000099] hover:bg-white"
                    >
                        <span className="w-[160px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
                            {selectedField ? getDisplayValue(selectedField) : config.placeholder}
                        </span>
                        {selectedField && (
                            <X
                                className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer hover:bg-gray-100 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearSelection();
                                }}
                            />
                        )}
                        <ChevronsUpDown className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary-600 p-1 text-white" />
                    </Button>
                </PopoverTrigger>
                {isLoading ? (
                    <div className="w-[200px] p-4 text-center text-sm text-gray-500">
                        Loading...
                    </div>
                ) : (
                    <PopoverContent className="w-[200px] p-0 font-product-sans text-sm">
                        <Command>
                            <CommandInput
                                placeholder={config.searchPlaceholder}
                                className="h-9"
                            />
                            <CommandList>
                                <CommandEmpty>{config.emptyMessage}</CommandEmpty>
                                <CommandGroup>
                                    {data?.map((item, index) => {
                                        const itemId = getItemId(item);
                                        const displayValue = getDisplayValue(item);
                                        const isSelected = selectedField && getItemId(selectedField) === itemId;

                                        return (
                                            <CommandItem
                                                key={itemId || index}
                                                value={displayValue}
                                                onSelect={() => handleSelectItem(itemId)}
                                                className="cursor-pointer"
                                            >
                                                <span className="truncate">{displayValue}</span>
                                                <Check
                                                    className={cn(
                                                        "ml-2 h-4 w-4",
                                                        isSelected ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
};

export default DropDownPoper;