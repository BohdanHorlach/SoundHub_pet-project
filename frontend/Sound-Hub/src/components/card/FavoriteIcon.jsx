import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";


export default function FavoriteIcon({ isFavorite, className = "" }) {
  const Icon = isFavorite ? HeartSolid : HeartOutline;

  return <Icon className={`size-6 ${className}`} />;
}