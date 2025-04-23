"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const AddCoinForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Coin</DialogTitle>
        </DialogHeader>
        <form className="space-y-3 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Coin Name</Label>
            <Input id="name" name="name" placeholder="Bitcoin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" name="symbol" placeholder="BTC" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id">ID</Label>
            <Input id="id" name="id" placeholder="bitcoin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" placeholder="bitcoin" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { AddCoinForm };
