export type CampRecord = {
  id: number;
  name: string;
  date: Date;
  memo: string | null;
  photos: string;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CampRecordFormData = {
  name: string;
  date: string;
  memo?: string;
  lat: number;
  lng: number;
};
