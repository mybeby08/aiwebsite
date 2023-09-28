import { Heading } from "@/components/base";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import React from "react";

const Page = () => {
  const isPro = false;
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm font-bold">
          {isPro
            ? "You are currently subscribed to the Pro plan."
            : "You are currently on a free plan."}
        </div>
        <Button disabled={true} variant="premium">
          {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
