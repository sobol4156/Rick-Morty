
 interface Character {
    name: string;
    species: string;
    image: string;
    status: string;
    location: {
      name: string;
    };
    origin: {
      name: string;
    };
  }
  
 export interface ApiResponse {
    results: Character[];
    info: {
      pages: number;
    };
  }