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
import { useQuery } from "@tanstack/react-query";
import { fetchBooth, fetchUsers } from "@/api";
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
        <DialogContent className="sm:max-w-[425px] scrollbar-hide">
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
  const [intervieweeEmail, setIntervieweeEmail] = React.useState<string>();
  const [rating, setRating] = React.useState<string>();
  const [passed, setPassed] = React.useState(true);

  const { data: boothDetails, isLoading } = useQuery({
    queryFn: async () => {
      const booth = await fetchBooth(boothId);
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

  return (
    <form
      className={cn(
        "grid max-h-[450px] overflow-y-auto scrollbar-hide items-start gap-6",
        className
      )}
    >
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input type="name" id="name" defaultValue={boothDetails?.title} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Interviewee</Label>
        <SelectWrapper
          placeholder="interviewee"
          options={allUsers ?? []}
          setValue={setIntervieweeEmail}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Rating</Label>
        <SelectWrapper
          placeholder="rating"
          options={RatingOptions}
          setValue={setRating}
        />
      </div>
      {boothDetails?.tasks.map((x: any, index: number) => {
        return (
          <div className="grid gap-3">
            <Label htmlFor="name">Task</Label>
            <Input type="name" id="name" defaultValue={x.name} />
          </div>
        );
      })}
      <div className="grid gap-3">
        <Label htmlFor="name">Review</Label>
        <Textarea defaultValue={boothDetails?.review} />
      </div>
      <div className="grid gap-3">
        <Switch
          checked={passed}
          onCheckedChange={(e) => setPassed(e)}
          className="bg-white"
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

function SelectWrapper<T, K>({
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
        {options.map((email) => {
          return (
            <SelectItem value={email} className="w-full p-2.5">
              {email}
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
