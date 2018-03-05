interface Category {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
  details: string;
}

interface Notification {
  id: number;
  daysBefore: number;
  color: string;
}

interface Storage {
  id: number;
  name: string;
  locationId: number;
  details: string;
}

