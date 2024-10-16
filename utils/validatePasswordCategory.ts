import { ServiceCategories } from '@/utils/enum/ServicesCategory';

export const validateCategory = (
  category: string | null
): ServiceCategories => {
  return Object.values(ServiceCategories).includes(
    category as ServiceCategories
  )
    ? (category as ServiceCategories)
    : ServiceCategories.OTHERS;
};
