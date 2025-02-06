"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();
  const stripeId = offer.stripeIds[year ? "yearly" : "monthly"];
  
  if (!stripeId) {
    return (
      <Button variant="outline" rounded="full" className="w-full" disabled>
        Unavailable
      </Button>
    );
  }

  const generateUserStripeSession = generateUserStripe.bind(
    null,
    stripeId,
  );

  const stripeSessionAction = () =>
    startTransition(async () => {
      try {
        await generateUserStripeSession();
      } catch (error) {
        toast.error("Failed to generate stripe session");
      }
    });

  const userOffer =
    subscriptionPlan.stripePriceId === stripeId;

  return (
    <Button
      variant={userOffer ? "default" : "outline"}
      rounded="full"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>{userOffer ? "Manage Subscription" : "Upgrade"}</>
      )}
    </Button>
  );
}
