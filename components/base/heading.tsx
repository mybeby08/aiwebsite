import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}
const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={"p-2 w-fit rounded-md"}>
        <Icon className={cn("w-16 h-16", iconColor)} />
      </div>
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Heading;
