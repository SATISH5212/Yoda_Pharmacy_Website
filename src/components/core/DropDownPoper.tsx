import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";


interface IDropDownPoperProps {
    data: any[] | string[];
    onSelect?: (robot: any | null) => void;
    type: string
    isLoading: boolean
}

const DropDownPoper: React.FC<IDropDownPoperProps> = (props) => {
    const { data, onSelect, type, isLoading } = props;
    const [open, setOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<any | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
      const handleSelectRobot = (robotId: string) => {
        const selected = data.find((item) => {
            if (typeof item === "object") {
                return item.id.toString() === robotId;
            } else {
                return item === robotId;
            }
        });
        setSelectedField(selected || null);
        onSelect?.(selected || null);
        setOpen(false);
        setSearchTerm("");
    };

    const handleClearSelection = () => {
        setSelectedField(null);
        onSelect?.(null);
        setSearchTerm("");
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
                            {type === "robots" ? (
                                `${selectedField ? (typeof selectedField === "object" ? selectedField.robot_name : selectedField) : "Select Robot"}`
                            ) : type === "rowPattren" ? (
                                `${selectedField ? (typeof selectedField === "object" ? selectedField.pattren_type : selectedField) : "Select Pattren Type"}`
                            ) : (
                                `${selectedField ? (typeof selectedField === "object" ? selectedField.field_name : selectedField) : "Select Field"}`
                            )}
                        </span>
                        {selectedField && (
                            <span
                                className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClearSelection()

                                }}
                            >X
                            </span>
                        )}
                        <ChevronsUpDown className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary-600 p-1 text-white" />
                    </Button>
                </PopoverTrigger>
                {isLoading ? <div>Loading...</div> : (

                    <PopoverContent className="w-[200px] p-0 font-product-sans text-sm">
                        <Command>
                            <CommandInput
                                placeholder={`Search ${type === "robots" ? "Robots" : type === "rowPattren" ? "Pattren Types" : "Fields"}`}
                                value={searchTerm}
                                onValueChange={setSearchTerm}
                                className="h-9"
                            />
                            <CommandList>
                                <CommandEmpty>No {type === "robots" ? "Robots" : "Fields"} found.</CommandEmpty>
                                <CommandGroup>
                                    {data?.map((item, index) => (
                                        <CommandItem
                                            key={typeof item === "object" ? item.id : index}
                                            value={typeof item === "object" ? item.id.toString() : item}
                                            onSelect={handleSelectRobot}
                                            className="cursor-pointer"
                                        >
                                            <span className="truncate">{typeof item === "object" ? (type === "robots" ? item.robot_name : item.field_name) : item}</span>
                                            <Check
                                                className={cn(
                                                    "ml-2 h-4 w-4",
                                                    selectedField === (typeof item === "object" ? item.id : item) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
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