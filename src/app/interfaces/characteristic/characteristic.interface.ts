import { CharacteristicType } from '@app/enums/characteristic-type.enum';

export interface Characteristic {
  id: number;
  name: string;
  type: CharacteristicType;
  createdDate: string;
  updatedDate: string;
  deletedDate: string;
}
