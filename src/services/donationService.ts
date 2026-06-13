export interface DonationRecord {
  id: string;
  name: string;
  email: string;
  amount: number;
  cause: 'education' | 'hygiene' | 'mentorship' | 'general';
  paymentMethod: 'card' | 'upi' | 'bank_transfer';
  memo?: string;
  createdAt: string;
}

const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'd1',
    name: 'Anjali Sharma',
    email: 'anjali.s@outlook.com',
    amount: 10000,
    cause: 'education',
    paymentMethod: 'card',
    memo: 'Sponsoring higher education tuition for standard cohort girls.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'd2',
    name: 'Robert Jenkins',
    email: 'r.jenkins@globalcare.org',
    amount: 25000,
    cause: 'mentorship',
    paymentMethod: 'bank_transfer',
    memo: 'Direct wire support for leadership development workshops.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'd3',
    name: 'Priya Patel',
    email: 'priya_patel20@gmail.com',
    amount: 2500,
    cause: 'hygiene',
    paymentMethod: 'upi',
    memo: 'To support clean sanitation drives and hygiene kits.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  }
];

export const getDonations = (): DonationRecord[] => {
  const saved = localStorage.getItem('she_can_donations');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('she_can_donations', JSON.stringify(INITIAL_DONATIONS));
  return INITIAL_DONATIONS;
};

export const submitDonation = (
  name: string,
  email: string,
  amount: number,
  cause: 'education' | 'hygiene' | 'mentorship' | 'general',
  paymentMethod: 'card' | 'upi' | 'bank_transfer',
  memo?: string
): DonationRecord => {
  const donations = getDonations();
  const newDonation: DonationRecord = {
    id: 'don_' + Math.random().toString(36).substr(2, 9),
    name: name || 'Anonymous Donor',
    email: email || 'anonymous@shecanfoundation.org',
    amount,
    cause,
    paymentMethod,
    memo,
    createdAt: new Date().toISOString()
  };
  const updated = [newDonation, ...donations];
  localStorage.setItem('she_can_donations', JSON.stringify(updated));
  return newDonation;
};

export const deleteDonation = (id: string): DonationRecord[] => {
  const donations = getDonations();
  const updated = donations.filter(don => don.id !== id);
  localStorage.setItem('she_can_donations', JSON.stringify(updated));
  return updated;
};
