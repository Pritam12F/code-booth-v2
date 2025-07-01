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
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { UpdateForm } from "./update-form";
import { CreateForm } from "./create-form";

export function BoothDialog({
  dialogOpen,
  setDialogOpen,
  boothId,
  type,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boothId?: string;
  type: "CREATE" | "UPDATE";
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {type === "CREATE" ? "Create booth" : "Update booth"}
            </DialogTitle>
            <DialogDescription>
              {type === "CREATE"
                ? "Create your new code booth"
                : "Make changes to your coding booth here. Click save when youre done"}
            </DialogDescription>
          </DialogHeader>
          {boothId && type === "UPDATE" && <UpdateForm boothId={boothId} />}
          {type === "CREATE" && <CreateForm />}
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
        {boothId && type === "UPDATE" && <UpdateForm boothId={boothId} />}
        {type === "CREATE" && <CreateForm />}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
