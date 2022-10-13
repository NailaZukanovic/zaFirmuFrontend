


export interface IStudent {
   StudentId: number
   brIndeksa: number
   Ime: string
   Prezime: string
   Godina: number
   IDStatusa?: number
}

export interface IStudentStatus {
   StatusStudenta: number
   NazivStatusa: string
}