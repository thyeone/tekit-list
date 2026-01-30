import { OAuthProvider } from '@/modules/auth/auth.type';
import { IFileAsset } from './assets';

export namespace IUser {
  export interface Create {
    provider: OAuthProvider;
    providerId: string;
  }

  export interface Update {
    nickname?: string;
    profileImageId?: number;
  }
  export interface RO {
    id: number;
    nickname?: string;
    profileImage: IFileAsset.RO | null;
  }
}
