import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductEdit.module.scss';
import { getAdminProductDetailsData } from '../../model/selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';
import { fetchProductById } from '../../model/services/fetchProductById.ts';
import { EditProductCard } from '../EditProductCard/EditProductCard.tsx';
import { getAdminProductDetailsIsLoading } from '../../model/selectors/getAdminProductDetailsIsLoading/getAdminProductDetailsIsLoading.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import type { IconType } from 'antd/es/notification/interface';
import { VStack } from '@/shared/ui/Stack/index.ts';
import { useNavigate } from 'react-router-dom';
import { AdminFooter } from '@/features/Admin/adminFooter/index.ts';
import { Button, notification, Upload } from 'antd';
import { Product } from '@/entities/Product';
import { getRouteAdminProducts } from '@/shared/const/route.ts';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import type { UploadChangeParam } from 'antd/lib/upload';
import { updateProduct } from '../../model/services/updateProduct.ts';
import { deleteProduct } from '../../model/services/deleteProduct.ts';

interface ProductEditProps {
    id?: string;
}

const key = 'updatable';

export const ProductEdit = memo((props: ProductEditProps) => {
    const { id } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const product = useSelector(getAdminProductDetailsData);
    const isLoading = useSelector(getAdminProductDetailsIsLoading);
    const [productForm, setProductForm] = useState<Product>();
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<UploadFile[]>([]);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: IconType) => {
        api.open({
            key,
            message: 'Успешно!',
            description: 'Данные обновлены.',
            type,
            duration: 2,
        });
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, []);

    useEffect(() => {
        if (product) setProductForm(product);
    }, [product]);

    const updateForm = useCallback((value: string, key: keyof Product) => {
        setProductForm((prevState) => {
            if (prevState) {
                return { ...prevState, [key]: value };
            }
        });
    }, []);

    const fileListImages = useMemo<UploadFile[]>(() => {
        return productForm?.Images.length
            ? productForm.Images.map((image, index) => ({
                  uid: image.id.toString(),
                  name: `Image-${index + 1}`,
                  url: IMG_BASE_URL + image.url,
              }))
            : [];
    }, [productForm?.Images]);

    const updateImages = (info: UploadChangeParam) => {
        if (info.file.status === 'removed') {
            setDeletedImages((prevState) => [...prevState, info.file.uid]);
            return;
        }
        setNewImages((prevState) => [...prevState, info.fileList[info.fileList.length - 1]]);
    };

    const onUpdateProduct = () => {
        dispatch(
            updateProduct({
                name: productForm?.name,
                price: productForm?.price,
                code: productForm?.code,
                sex: productForm?.sex,
                images: {
                    deletedImages,
                    newImages,
                },
            }),
        );
        if (id) dispatch(fetchProductById(id));
    };
    
    const onDeleteProduct = () => {
        dispatch(deleteProduct()).then(res => {
            if (res.meta.requestStatus === 'fulfilled') navigate(getRouteAdminProducts());
        });
    }

    if (isLoading) {
        return (
            <VStack className={cls.EditProduct}>
                <div className={cls.containerEditProduct}></div>
            </VStack>
        );
    }

    return (
        <VStack className={cls.EditProduct}>
            <div className={cls.containerEditProduct}>
                <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => navigate(getRouteAdminProducts())}
                >
                    Вернуться назад
                </Button>
                <VStack gap="16" max className={cls.containerTitle}>
                    {contextHolder}
                    <h1>Изменение продукта</h1>
                    <h2>Индификатор {product?.id}</h2>
                </VStack>
            </div>

            <EditProductCard
                name={productForm?.name || ''}
                price={productForm?.price || 0}
                code={productForm?.code || ''}
                sex={productForm?.sex}
                updateForm={updateForm}
            />
            {/*TODO: сделать этот кусок лучше */}
            {(fileListImages.length || productForm?.Images.length === 0) && (
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    defaultFileList={fileListImages}
                    beforeUpload={() => false}
                    onChange={updateImages}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            )}

            <AdminFooter
                onUpdate={onUpdateProduct}
                onCancelEdit={() => console.log('Cancel Edit!')}
                onDelete={onDeleteProduct}
            />
        </VStack>
    );
});
