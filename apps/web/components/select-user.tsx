import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export function SelectUserWrapper({
  placeholder,
  options,
  setValue,
}: {
  placeholder: string;
  options: { id: string; email: string }[];
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Choose ${placeholder}`} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] w-full">
        {options.map(({ id, email }) => {
          return (
            <SelectItem value={id} className="w-full p-2.5">
              {email}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
