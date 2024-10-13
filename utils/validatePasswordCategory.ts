import { ServiceCategories } from '@/app/(routes)/(home)/components/ModalForm/enum/ServicesCategory';

export const validateCategory = (
  category: string | null
): ServiceCategories => {
  return Object.values(ServiceCategories).includes(
    category as ServiceCategories
  )
    ? (category as ServiceCategories)
    : ServiceCategories.OTROS;
};
