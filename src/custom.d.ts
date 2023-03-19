type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  remove: (id: string) => boolean,
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  create: (name: string) => 'success' | 'duplicated'//0表示成功，1表示name重复,
  save: () => void
}
