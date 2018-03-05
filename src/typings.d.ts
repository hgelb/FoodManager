/* SystemJS module definition */
export class Post {
  id: string;
}

export class Category {
  id: number;
  name: string;
}

export class Status {
  id: number;
  name: string;
}

export class Location {
  id: number;
  name: string;
  details: string;
}

export class Notification {
  id: number;
  categoryId: number;
  daysBefore: number;
  color: string;
}

export class Storage {
  id: number;
  name: string;
  locationId: number;
}

export class Item {
  id: number;
  name: string;
  storageId: number;
  categoryId: number;
  expiration: string;
  expirationDisplay: string;
  statusId: number;
  notificationColor: string;
}

