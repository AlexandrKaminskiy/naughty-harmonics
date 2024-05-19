export interface CompositionDocument {
  id: number;
  name: string;
  complexity: number;
  description: string;
  bpm: number;
  videoLink: string;
  clientName: string;
  clientId: number;
  isPublic: boolean;
  photoUrl: string;
  banned: boolean;
  deleted: boolean;
}
