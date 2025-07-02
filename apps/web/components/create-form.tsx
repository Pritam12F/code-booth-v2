import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { ComponentProps, useState } from "react";
import { SelectUserWrapper } from "./select-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RatingOptions, SelectRatingWrapper } from "./select-rating";
import { Trash } from "lucide-react";
import { CreateTaskDialog } from "./create-task";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { createBooth, fetchUsers } from "@/api";

export function CreateForm({
  className,
}: {
  className?: ComponentProps<"form">;
}) {
  const [boothName, setBoothName] = useState("");
  const [intervieweeId, setIntervieweeId] = useState<string>();
  const [rating, setRating] = useState<string>();
  const [review, setReview] = useState("");
  const [passed, setPassed] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);

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
        <Label htmlFor="name">Interviewee</Label>
        <SelectUserWrapper
          placeholder="interviewee"
          options={(cachedUsers as any) ?? allUsers}
          setValue={setIntervieweeId}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Rating</Label>
        <SelectRatingWrapper
          placeholder="rating"
          options={RatingOptions}
          setValue={setRating}
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
        <Label htmlFor="name">Review</Label>
        <Textarea
          defaultValue={"Enter your review"}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Switch
          checked={passed}
          onCheckedChange={(e) => setPassed(e)}
          className="bg-white"
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
              passed,
              tasks,
              review,
              rating,
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
