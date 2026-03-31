export interface HoneymoonItem {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  icon: string; // emoji like ✈️, 🏨, 🍽️
  category: 'travel' | 'accommodation' | 'experiences' | 'activities';
}

export interface Contribution {
  id: string;
  itemId: string;
  guestName: string;
  amount: number;
  message?: string;
  createdAt: string;
}

// Mock data: 6-8 honeymoon items
export const HONEYMOON_ITEMS: HoneymoonItem[] = [
{
  id: '1',
  title: 'Flight Tickets',
  description: 'Round-trip flights to Santorini, Greece',
  targetAmount: 2400,
  currentAmount: 800,
  icon: '✈️',
  category: 'travel'
},
{
  id: '2',
  title: 'Luxury Hotel Stay',
  description: '7 nights at a cliffside resort with ocean views',
  targetAmount: 3500,
  currentAmount: 1200,
  icon: '🏨',
  category: 'accommodation'
},
{
  id: '3',
  title: 'Romantic Dinners',
  description: 'Fine dining experiences at local restaurants',
  targetAmount: 800,
  currentAmount: 400,
  icon: '🍽️',
  category: 'experiences'
},
{
  id: '4',
  title: 'Sunset Sailing',
  description: 'Private sunset cruise around the caldera',
  targetAmount: 600,
  currentAmount: 0,
  icon: '⛵',
  category: 'activities'
},
{
  id: '5',
  title: 'Wine Tasting Tour',
  description: 'Full-day tour of local wineries',
  targetAmount: 400,
  currentAmount: 200,
  icon: '🍷',
  category: 'experiences'
},
{
  id: '6',
  title: 'Couples Spa Day',
  description: 'Relaxing spa treatments and massages',
  targetAmount: 500,
  currentAmount: 500,
  icon: '💆',
  category: 'experiences'
}];


export const CONTRIBUTIONS_STORAGE_KEY = 'wedding_honeymoon_contributions';

export const getStoredContributions = (): Contribution[] => {
  const stored = localStorage.getItem(CONTRIBUTIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveContribution = (contribution: Contribution) => {
  const contributions = getStoredContributions();
  contributions.push(contribution);
  localStorage.setItem(CONTRIBUTIONS_STORAGE_KEY, JSON.stringify(contributions));
};

export const getUpdatedItems = (): HoneymoonItem[] => {
  const contributions = getStoredContributions();

  return HONEYMOON_ITEMS.map((item) => {
    const itemContributions = contributions.filter((c) => c.itemId === item.id);
    const totalContributed = itemContributions.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    // Ensure we don't exceed target + currentAmount (simulating backend logic)
    // In this mock, currentAmount in HONEYMOON_ITEMS is initial amount
    // We add user contributions to it
    const newAmount = Math.min(
      item.targetAmount,
      item.currentAmount + totalContributed
    );

    return {
      ...item,
      currentAmount: newAmount
    };
  });
};