import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { ComponentProps, useState } from "react";
import { SelectWrapper } from "./select-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { CreateTaskDialog } from "./create-task";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { createBooth, fetchUsers } from "@/api";
import EmojiPicker from "./emoji-picker";

export function CreateForm({
  className,
}: {
  className?: ComponentProps<"form">;
}) {
  const [boothName, setBoothName] = useState("");
  const [boothDescripton, setBoothDescription] = useState("");
  const [intervieweeId, setIntervieweeId] = useState<string>();
  const [tasks, setTasks] = useState<any[]>([]);
  const [emoji, setEmoji] = useState("✅");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [workspaceType, setWorkspaceType] = useState<string>();

  const queryClient = useQueryClient();
  const cachedUsers = queryClient.getQueryData(["users"]);

  const { data: allUsers } = useQuery({
    queryFn: async () => {
      return fetchUsers();
    },
    queryKey: ["users"],
    enabled: !cachedUsers,
  });

  const { mutateAsync: createBoothMutation } = useMutation({
    mutationFn: createBooth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booths"] });
    },
  });

  return (
    <form
      className={cn(
        "grid max-h-[450px] overflow-y-auto scrollbar-hide items-start gap-6",
        className
      )}
    >
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          type="name"
          id="name"
          placeholder="Enter new booth name"
          onChange={(e) => setBoothName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="resize-none h-24"
          placeholder="Enter new booth description"
          onChange={(e) => setBoothDescription(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Interviewee</Label>
        <SelectWrapper
          placeholder="interviewee"
          options={((cachedUsers as any) ?? allUsers)?.map(
            ({ id, email }: { id: string; email: string }) => ({
              id,
              label: email,
            })
          )}
          setValue={setIntervieweeId}
        />
      </div>
      {tasks.map((x: any, index: number) => {
        return (
          <div className="space-y-5 flex flex-col" key={x.id}>
            <Label htmlFor="name">Task</Label>
            <div className="flex">
              <Input
                type="name"
                id="name"
                defaultValue={x.name}
                onChange={(e) => {
                  const arrIndex = tasks.findIndex((task) => task.id === x.id);
                  tasks[arrIndex] = {
                    ...tasks[arrIndex],
                    name: e.target.value,
                  };
                }}
              />
              <div className="flex items-center">
                <Trash
                  height={17}
                  className="ml-3 hover:cursor-pointer hover:text-red-500 transition-all duration-75 delay-75"
                  onClick={async () => {
                    const tasksAfterDeletion = tasks.filter(
                      (task) => task.id !== x.id
                    );
                    setTasks([...tasksAfterDeletion]);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <CreateTaskDialog addTaskHandler={setTasks} tasks={tasks} />
      <div className="grid gap-3">
        <Label htmlFor="type">Workspace Type</Label>
        <SelectWrapper
          placeholder="workspace type"
          options={[
            { id: "HTML_CSS_JS", label: "HTML/CSS/JS" },
            {
              id: "REACT",
              label: "React",
            },
          ]}
          setValue={setWorkspaceType}
        />
      </div>
      <div className="grid gap-5">
        <div className="text-[14px] font-medium">Emoji</div>
        <div
          onClick={() => {
            setEmojiPickerOpen(true);
          }}
          className="text-4xl cursor-pointer"
        >
          {emoji}
        </div>
        <EmojiPicker
          setEmoji={setEmoji}
          isOpen={emojiPickerOpen}
          setIsOpen={setEmojiPickerOpen}
        />
      </div>
      <Button
        type="button"
        className="cursor-pointer"
        onClick={async () => {
          try {
            await createBoothMutation({
              boothName,
              intervieweeId: intervieweeId!,
              emoji,
              description: boothDescripton,
              tasks,
              type: workspaceType!,
            });

            toast.success("Booth created!");
          } catch (e) {
            console.error(e);
            toast.error("Couldn't create booth");
          }
        }}
      >
        Save changes
      </Button>
    </form>
  );
}
