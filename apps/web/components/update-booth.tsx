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
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

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
  const session = useSession();
  const {} = useQuery({
    queryFn: async () => {},
    queryKey: [`booth-${boothId}`],
  });
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input type="name" id="name" defaultValue="shadcn@example.com" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
