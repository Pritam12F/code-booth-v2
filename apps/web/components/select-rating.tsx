import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

export function SelectRatingWrapper({
  placeholder,
  options,
  setValue,
}: {
  placeholder: string;
  options: string[];
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
        {options.map((option) => {
          return (
            <SelectItem value={option} className="w-full p-2.5">
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export const RatingOptions = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
