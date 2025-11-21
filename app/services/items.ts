type Item = {
  id: string;
  title: string;
  location: string;
  type: 'flight' | 'train' | 'car' | 'stay';
  price?: number;
  popularity?: number;
  status?: 'available' | 'soldout';
  image?: string;
};

const MOCK_ITEMS: Item[] = [
  { id: '1', title: 'New York - Flight', location: 'New York', type: 'flight', price: 199, popularity: 90, status: 'available' },
  { id: '2', title: 'London - Train', location: 'London', type: 'train', price: 49, popularity: 80, status: 'available' },
  { id: '3', title: 'Tokyo - Stay', location: 'Tokyo', type: 'stay', price: 120, popularity: 95, status: 'available' },
  { id: '4', title: 'San Francisco - Car', location: 'San Francisco', type: 'car', price: 60, popularity: 70, status: 'available' },
];

export async function fetchTransportItems(): Promise<Item[]> {
  // simulate network latency
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_ITEMS.slice()), 300));
}

export async function searchItems(query: string): Promise<Item[]> {
  const q = query.trim().toLowerCase();
  if (!q) return fetchTransportItems();
  const items = MOCK_ITEMS.filter(
    (i) => i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)
  );
  return Promise.resolve(items);
}

export async function filterItems(filterOptions: { type?: Item['type']; minPopularity?: number; status?: Item['status'] }): Promise<Item[]> {
  const items = MOCK_ITEMS.filter((i) => {
    if (filterOptions.type && i.type !== filterOptions.type) return false;
    if (filterOptions.status && i.status !== filterOptions.status) return false;
    if (filterOptions.minPopularity && (i.popularity ?? 0) < filterOptions.minPopularity) return false;
    return true;
  });
  return Promise.resolve(items);
}

export type { Item };

