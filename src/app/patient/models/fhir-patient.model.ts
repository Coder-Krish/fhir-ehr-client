export class ContactPoint {
    system?: string; // Optional system (e.g., phone, email)
    value: string = "";
    use?: string; // Optional use (e.g mobile, home)
  }
  
  export class Address {
    use?: string; // Optional use (e.g., home)
    type?: string; // Optional type (e.g., physical)
    line?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  }
  
  export class HumanName {
    use: string = ""; // Required use (e.g., official)
    given?: string; // Optional given names
    family: string = ""; // Required family name
    prefix: string = ""; // Optional prefix (e.g., Mr., Ms.)
  }
  
  export class PatientResource {
    resourceType:string = "Patient";
    id?: string; // Optional ID for the resource
    name = new HumanName();
    gender: string = "";
    birthDate: string = "";
    telecom = new ContactPoint()
    address = new Address();
    age: number = 0;
  }
  