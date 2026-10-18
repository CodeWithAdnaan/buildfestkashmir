"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteEventAction } from "@/app/admin/events/actions";
import { Button } from "@/components/ui/button";

interface DeleteEventButtonProps {
  slug: string;
  eventName: string;
}

export function DeleteEventButton({ slug, eventName }: DeleteEventButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to permanently delete "${eventName}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteEventAction(slug);
      if (res?.error) {
        alert("Failed to delete event: " + res.error);
        setIsDeleting(false);
      } else {
        router.refresh();
      }
    } catch (err: unknown) {
      alert("Error deleting event: " + (err instanceof Error ? err.message : "Unknown error"));
      setIsDeleting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-mono h-8 px-2.5"
      title={`Delete ${eventName}`}
    >
      {isDeleting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      <span className="ml-1.5 hidden sm:inline">Delete</span>
    </Button>
  );
}
