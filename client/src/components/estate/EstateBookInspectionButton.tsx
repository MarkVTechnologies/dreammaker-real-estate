"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { InspectionForm } from "./InspectionForm";

interface EstateBookInspectionButtonProps {
  estateId: string;
  estateName: string;
  className?: string;
}

/** Opens the inspection form in a modal instead of navigating away from the estate page. */
export function EstateBookInspectionButton({
  estateId,
  estateName,
  className,
}: EstateBookInspectionButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Book inspection
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Book an inspection">
        <InspectionForm variant="INSPECTION" estateId={estateId} estateName={estateName} />
      </Modal>
    </>
  );
}
