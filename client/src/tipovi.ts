export interface User {
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  username: string,
  category: 'user' | 'admin',
  pokusaji?: Pokusaj[]
}
export interface Kurs {
  id: number,
  naziv: string
}
export interface Kviz {
  id: number,
  naziv: string,
  kurs?: Kurs[]
}
export interface Pitanje {
  id: number,
  tekstPitanja: string,
  brojPoena: number,
  opcije: string[]
}
export interface Pokusaj {
  brojPoena: number,
  userId: number,
  kvizId: number
}
