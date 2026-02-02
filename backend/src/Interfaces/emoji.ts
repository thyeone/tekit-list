import type { IFileAsset } from '@/Interfaces/assets';

export namespace IEmoji {
  export interface RO {
    id: number;
    name: string;
    image: IFileAsset.RO | null;
  }
}
