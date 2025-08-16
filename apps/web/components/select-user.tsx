import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export function SelectWrapper({
  placeholder,
  options,
  defaultValue,
  setValue,
}: {
  placeholder: string;
  defaultValue?: string;
  options: { id: string; label: string }[];
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger className="w-full">
        {defaultValue ? (
          <SelectValue placeholder={defaultValue} />
        ) : (
          <SelectValue placeholder={`Choose ${placeholder}`} />
        )}
      </SelectTrigger>
      <SelectContent className="max-h-[300px] w-full">
        {options?.map(({ id, label }) => {
          return (
            <SelectItem value={id} className="w-full p-2.5">
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
