import { useQuery, useMutation } from '@tanstack/react-query';
import { useAppStore } from '../store/useAppStore';

interface LoveQuote {
  content: string;
  author: string;
  _id: string;
}



// Mock mutation to "send" the final answer
export const useSubmitAnswer = () => {
  const { setHasAnsweredYes } = useAppStore();

  return useMutation({
    mutationFn: async (answer: 'yes' | 'no') => {
      // Simulate an API call
      await new Promise((res) => setTimeout(res, 500));
      console.log(`[Naanu's Answer]: ${answer.toUpperCase()} 🌻`);
      return { success: true, answer };
    },
    onSuccess: (data) => {
      if (data.answer === 'yes') {
        setHasAnsweredYes(true);
      }
    },
  });
};
