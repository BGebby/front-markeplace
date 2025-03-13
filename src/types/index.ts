export interface User {
  id: number;
  email: string;
  rol_id:number
}

export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  cantidad: number ;
  imagen: string ;
  sku: number ;
  precio: number;
  user_id: number;
  user?:string

}
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}