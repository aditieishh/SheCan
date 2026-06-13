export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const INITIAL_SUBMISSIONS: ContactSubmission[] = [
  {
    id: 's1',
    name: 'Jane Doe',
    email: 'jane@foundation.org',
    message: 'Hello! I am highly interested in volunteering for the upcoming winter mentorship program. Please let me know the application steps.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 's2',
    name: 'Sophia Loren',
    email: 'sophia@loren.com',
    message: 'I want to inquire about potential scholarship programs for girls in primary schools. Thank you for your amazing service!',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 's3',
    name: 'Amina Al-Masri',
    email: 'amina.m@gmail.com',
    message: 'Greetings from Amman. We would love to translate your curriculum to empower young women here. Please contact our community board.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  }
];

export const getSubmissions = (): ContactSubmission[] => {
  const saved = localStorage.getItem('she_can_submissions');
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem('she_can_submissions', JSON.stringify(INITIAL_SUBMISSIONS));
  return INITIAL_SUBMISSIONS;
};

export const submitContact = (name: string, email: string, message: string): ContactSubmission => {
  const submissions = getSubmissions();
  const newSubmission: ContactSubmission = {
    id: 'sub_' + Math.random().toString(36).substr(2, 9),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  const updated = [newSubmission, ...submissions];
  localStorage.setItem('she_can_submissions', JSON.stringify(updated));
  return newSubmission;
};

export const deleteSubmission = (id: string): ContactSubmission[] => {
  const submissions = getSubmissions();
  const updated = submissions.filter(sub => sub.id !== id);
  localStorage.setItem('she_can_submissions', JSON.stringify(updated));
  return updated;
};
