import { CharacteristicType } from '@app/enums/characteristic-type.enum';

export interface CreateCharacteristic {
  name: string;
  type: CharacteristicType;
}
