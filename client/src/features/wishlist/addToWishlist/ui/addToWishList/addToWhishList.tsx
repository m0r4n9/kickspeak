import { AnimatePresence, motion } from 'framer-motion';
import cls from './addToWishList.module.scss';
import { ReactComponent as StartIcon } from '@/shared/assets/icons/star-icon-m.svg';
import { Button } from '@/shared/ui/Button';
import { addToWishlist } from '../../model/services/addToWishlist';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { toast } from 'sonner';

interface AddToWishListProps {
    hover: boolean;
    productId: string;
}

export const AddToWishList = (props: AddToWishListProps) => {
    const { hover, productId } = props;
    const dispatch = useAppDispatch();

    const addProductToWishList = () => {
        dispatch(addToWishlist({ productId })).then((res) => {
            const action = res.payload;
            if (action === 'add') {
                toast.success('Товар добавлен в избранное.');
            }
            if (action === 'delete') {
                toast.error('Товар удален из избранного.');
            }
        });
    };

    return (
        <AnimatePresence>
            {hover && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className={cls.actions}
                >
                    <Button variant="ghost" onClick={addProductToWishList}>
                        <StartIcon className={cls.starIcon} />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
