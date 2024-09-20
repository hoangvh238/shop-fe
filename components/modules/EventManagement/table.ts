export type Event = {
  _id: string;
  name: string;
  location: string;
  startTime: string;
  type: string;
  status: string;
};

export const columns = [
  // { name: "ORDER", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  // { name: "LOCATION", uid: "location", sortable: true },
  { name: "DATE", uid: "startTime", sortable: true },
  { name: "TYPE", uid: "type" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
