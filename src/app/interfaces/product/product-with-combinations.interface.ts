import { CharactersiticProduct } from './characteristic-product.interface';
import { Product } from './product.interface';

export interface ProductWithCombinationsDto extends Product {
  characteristics: CharactersiticProduct[];
  combinations: string[];
}
