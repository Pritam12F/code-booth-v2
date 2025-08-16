import { deleteTask, fetchBooth, fetchUsers, updateBooth } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { ComponentProps, useEffect, useState } from "react";
import { SelectWrapper } from "./select-user";
import { RatingOptions, SelectRatingWrapper } from "./select-rating";
import { Trash } from "lucide-react";
import { CreateTaskDialog } from "./create-task";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import EmojiPicker from "./emoji-picker";

export function UpdateForm({
  className,
  boothId,
}: ComponentProps<"form"> & {
  boothId: string;
}) {
  const [boothName, setBoothName] = useState("");
  const [intervieweeId, setIntervieweeId] = useState<string>();
  const [rating, setRating] = useState<string>();
  const [review, setReview] = useState("");
  const [passed, setPassed] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [type, setType] = useState<string>();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const queryClient = useQueryClient();
  const cachedUsers = queryClient.getQueryData(["users"]);

  const { data: boothDetails, isLoading } = useQuery({
    queryFn: async () => {
      const booth = await fetchBooth(boothId);
      setBoothName(booth!.title);
      setDescription(booth?.description!);
      setIntervieweeId(booth?.interviewee?.id!);
      setEmoji(booth?.icon!);
      setRating(booth?.rating.content);
      setReview(booth?.review.content!);
      setPassed(booth?.passed ?? false);
      return booth;
    },
    queryKey: [`booth-${boothId}`],
  });

  const { data: allUsers, isLoading: isUserLoading } = useQuery({
    queryFn: async () => {
      return fetchUsers();
    },
    queryKey: ["users"],
    enabled: !cachedUsers,
  });

  const { mutateAsync: updateBoothMutation } = useMutation({
    mutationFn: updateBooth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: `booth-${boothId}` as any });
    },
  });

  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
  });

  useEffect(() => {
    setTasks([...(boothDetails?.tasks ?? [])]);
  }, [boothDetails?.tasks]);

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
          defaultValue={boothName}
          onChange={(e) => setBoothName(e.target.value)}
          placeholder="Enter new booth name..."
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="h-24 resize-none"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter new booth description..."
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Interviewee</Label>
        <SelectWrapper
          placeholder="new interviewee"
          options={((cachedUsers as any) ?? allUsers)?.map(
            ({ id, email }: { id: string; email: string }) => ({
              id,
              label: email,
            })
          )}
          setValue={setIntervieweeId}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Rating</Label>
        <SelectRatingWrapper
          placeholder="new rating"
          options={RatingOptions}
          setValue={setRating}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Review</Label>
        <Textarea
          defaultValue={review}
          onChange={(e) => setReview(e.target.value)}
          className="resize-none"
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
                    await deleteTaskMutation(x.id);
                    setTasks([...tasksAfterDeletion]);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <CreateTaskDialog
        addTaskHandler={setTasks}
        tasks={tasks}
        boothId={boothId}
      />
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
          setValue={setType}
        />
      </div>
      <div className="flex flex-row items-center space-x-4">
        <span>Passed</span>
        <Switch
          checked={passed}
          onCheckedChange={(e) => setPassed(e)}
          className="bg-white cursor-pointer"
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
            await updateBoothMutation({
              boothId,
              boothName,
              intervieweeId,
              rating,
              review,
              passed,
              tasks,
              type,
              description,
              emoji,
            });

            toast.success("Booth updated!");
          } catch (e) {
            console.error(e);
            toast.error("Couldn't update booth");
          }
        }}
      >
        Save changes
      </Button>
    </form>
  );
}
