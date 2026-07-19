import { Code2, FolderGit2, Coffee, Users } from "lucide-react";
import type { StatItem } from "@/types";

export const stats: StatItem[] = [
  { label: "Projects Shipped", value: 24, suffix: "+", icon: FolderGit2 },
  { label: "Lines of Code", value: 150, suffix: "k+", icon: Code2 },
  { label: "Happy Clients", value: 12, suffix: "+", icon: Users },
  { label: "Cups of Coffee", value: 900, suffix: "+", icon: Coffee },
];
