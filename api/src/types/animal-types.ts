export interface IAnimal {
  // _id: string;
  id_senasa: string;
  type_of_animal: ITypeOfAnimal;
  breed_name?: string;
  location?: string;
  weight_kg?: number;
  name?: string;
  device_type: string;
  device_number: string;
  comments?: string;
  images?: string[];
  image_1?: string;
  image_2?: string;
  image_3?: string;
  birthday?: string;
  is_pregnant?: boolean;
  delivery_date?: string;
}

export enum ITypeOfAnimal {
  Novillo = "Novillo",
  Toro = "Toro",
  Vaquillona = "Vaquillona",
  Vaca = "Vaca",
}
