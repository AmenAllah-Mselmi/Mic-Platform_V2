export type Instructor = {
  NomPrenom: string;
  _id: string;
  Email: string;
  Password?: string; // Optional for security; should not be exposed after creation
  Role: string;
  Adresse: string;
  ImageLink?: string;
  DepartmentId: string;  // Department ID or Department Name
  };
  export type State = {
    instructors: Instructor[];
  };