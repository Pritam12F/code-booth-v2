"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchBooth, fetchUsers, updateBooth } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export function UpdateDialog({
  dialogOpen,
  setDialogOpen,
  boothId,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boothId: string;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update booth</DialogTitle>
            <DialogDescription>
              Make changes to your coding booth here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm boothId={boothId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update booth</DrawerTitle>
          <DrawerDescription>
            Make changes to your coding booth here. Click save when you&apos;re
            done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" boothId={boothId} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  boothId,
}: React.ComponentProps<"form"> & {
  boothId: string;
}) {
  const [boothName, setBoothName] = React.useState("");
  const [intervieweeId, setIntervieweeId] = React.useState<string>();
  const [rating, setRating] = React.useState<string>();
  const [review, setReview] = React.useState("");
  const [passed, setPassed] = React.useState(false);
  const [tasks, setTasks] = React.useState<any[]>([]);

  const { data: boothDetails, isLoading } = useQuery({
    queryFn: async () => {
      const booth = await fetchBooth(boothId);
      setBoothName(booth.title);
      setIntervieweeId(booth.interviewee.id);
      setRating(booth.rating);
      setReview(booth.review.content);
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
  });

  const { mutateAsync: updateBoothMutation } = useMutation({
    mutationFn: updateBooth,
  });

  React.useEffect(() => {
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
          defaultValue={boothDetails?.title}
          onChange={(e) => setBoothName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Interviewee</Label>
        <SelectUserWrapper
          placeholder="interviewee"
          options={allUsers ?? []}
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
          <div className="grid gap-3">
            <Label htmlFor="name">Task</Label>
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
          </div>
        );
      })}
      <div className="grid gap-3">
        <Label htmlFor="name">Review</Label>
        <Textarea
          defaultValue={boothDetails?.review.content}
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
            });
          } catch {
            alert("Couldn't update booth");
          }
        }}
      >
        Save changes
      </Button>
    </form>
  );
}

function SelectUserWrapper({
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

function SelectRatingWrapper({
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

const RatingOptions = [
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
