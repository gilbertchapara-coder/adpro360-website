import {
  Target,
  Tag,
  Layers,
  Megaphone,
  Palette,
  PenLine,
  MonitorPlay,
  Clapperboard,
  SlidersHorizontal,
  Calendar,
  ShoppingBag,
  Signpost,
  MessageCircle,
  TrendingUp,
  Image,
  ShieldCheck,
  Ticket,
  Mail,
  type LucideIcon,
} from "lucide-react";

/** One icon per `service.tags` label (lib/content/services.ts) — keyed by
 * the exact tag string so adding a tag without a matching entry here just
 * renders no icon (FeatureChip guards for a missing map hit) rather than
 * throwing. */
export const TAG_ICONS: Record<string, LucideIcon> = {
  Positioning: Target,
  Naming: Tag,
  "Brand architecture": Layers,
  "Campaign platforms": Megaphone,
  "Art direction": Palette,
  Copy: PenLine,
  TVC: MonitorPlay,
  "Corporate film": Clapperboard,
  Post: SlidersHorizontal,
  Planning: Calendar,
  Buying: ShoppingBag,
  Outdoor: Signpost,
  Social: MessageCircle,
  Performance: TrendingUp,
  Content: Image,
  Reputation: ShieldCheck,
  Events: Ticket,
  "Internal comms": Mail,
};
