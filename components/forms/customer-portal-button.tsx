"use client";

import { useTransition } from "react";
import { openCustomerPortal } from "@/actions/open-customer-portal";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = openCustomerPortal.bind(null, userStripeId);

  const stripeSessionAction = () =>
    startTransition(async () => {
      try {
        await generateUserStripeSession();
      } catch (error) {
        toast.error("Failed to open customer portal");
      }
    });

  return (
    <Button disabled={isPending} onClick={stripeSessionAction}>
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        "Open Customer Portal"
      )}
    </Button>
  );
}
