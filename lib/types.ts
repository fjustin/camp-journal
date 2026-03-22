export type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  createdAt: Date;
};

export type Campsite = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  prefecture: string | null;
  createdAt: Date;
};

export type CampRecord = {
  id: number;
  userId: string;
  campsiteId: number;
  date: Date;
  memo: string | null;
  photos: string;
  rating: number | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  campsite: Campsite;
};

export type CampRecordFormData = {
  campsiteName: string;
  lat: number;
  lng: number;
  date: string;
  memo?: string;
  rating?: number;
};
