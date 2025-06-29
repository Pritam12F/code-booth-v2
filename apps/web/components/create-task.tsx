import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

export function CreateTaskDialog({
  tasks,
  addTaskHandler,
  boothId,
}: {
  tasks: any[];
  addTaskHandler: React.Dispatch<React.SetStateAction<any[]>>;
  boothId?: string;
}) {
  const [task, setTask] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger className="w-fit mx-auto">
        <Button type="button" className="h-7.5 cursor-pointer">
          Add more tasks
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <div className="my-5">
            <Input
              placeholder="Enter new task"
              onChange={(e) => setTask(e.target.value)}
              value={task ?? ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTaskHandler([...tasks, { name: task, boothId }]);
                  setIsOpen(false);
                }
              }}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
