import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { GALLERY_DATA } from "@/lib/data/gallery";

export const galleryRepo = {
  all(): GalleryItem[] {
    return [...GALLERY_DATA];
  },

  getById(id: string): GalleryItem | undefined {
    return GALLERY_DATA.find((g) => g.id === id);
  },

  byCategory(category: GalleryCategory): GalleryItem[] {
    return GALLERY_DATA.filter((g) => g.category === category);
  },

  latest(count = 12): GalleryItem[] {
    return GALLERY_DATA.slice(0, count);
  },
};