import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductEdit.module.scss';
import { getAdminProductDetailsData } from '../../model/selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';
import { fetchProductById } from '../../model/services/fetchProductById.ts';
import { EditProductCard } from '../EditProductCard/EditProductCard.tsx';
import { updateProduct } from '../../model/services/updateProduct.ts';
import { createSize } from '../../model/services/createSize.ts';
import { deleteSize } from '../../model/services/deleteSize.ts';
import {updateSize} from "../../model/services/updateSize.ts";
import { deleteProduct } from '../../model/services/deleteProduct.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import type { IconType } from 'antd/es/notification/interface';
import { useNavigate } from 'react-router-dom';
import { AdminFooter } from '@/features/Admin/adminFooter/index.ts';
import { Button, notification } from 'antd';
import { Product } from '@/entities/Product';
import { getRouteAdminProducts } from '@/shared/const/route.ts';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { VStack } from '@/shared/ui/Stack/index.ts';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';

interface ProductEditProps {
    id?: string;
}

const key = 'updatable';

export const ProductEdit = memo((props: ProductEditProps) => {
    const { id } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const product = useSelector(getAdminProductDetailsData);
    const [productForm, setProductForm] = useState<Product>();
    const [imagesList, setImagesList] = useState<UploadFile[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
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
        if (product) {
            setProductForm(product);
            product?.colors?.length && setSelectedColors(product.colors);
            product?.Images.length &&
                setImagesList(
                    product.Images.map((image, index) => ({
                        uid: image.id.toString(),
                        name: `Image-${index + 1}`,
                        url: IMG_BASE_URL + image.url,
                    })),
                );
        }
    }, [product]);

    const updateForm = useCallback((value: string, key: keyof Product) => {
        setProductForm((prevState) => {
            if (prevState) {
                return { ...prevState, [key]: value };
            }
        });
    }, []);

    const onChangeColors = useCallback((color: string[]) => {
        setSelectedColors(color);
    }, []);

    const updateImages = useCallback((info: UploadChangeParam) => {
        setImagesList(info.fileList);
        if (info.file.status === 'removed') {
            setDeletedImages((prevState) => [...prevState, info.file.uid]);
        }
    }, []);

    const onUpdateProduct = () => {
        dispatch(
            updateProduct({
                name: productForm?.name,
                price: productForm?.price,
                code: productForm?.code,
                sex: productForm?.sex,
                colors: selectedColors,
                images: {
                    deletedImages,
                    newImages: imagesList.filter(
                        (image) => image.originFileObj,
                    ),
                },
            }),
        ).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                openNotification('success');
            } else if (res.meta.requestStatus === 'rejected') {
                openNotification('error');
            }
        });
    };

    const addSize = useCallback(
        (name: string, quantity: number, productId: string) => {
            dispatch(
                createSize({
                    name,
                    quantity,
                    productId,
                }),
            ).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    if (id) dispatch(fetchProductById(id));
                }
            });
        },
        [],
    );

    const onDeleteSize = useCallback((sizeId: string) => {
        dispatch(deleteSize(sizeId)).then((res) => {
            if (res.meta.requestStatus == 'fulfilled') {
                if (id) dispatch(fetchProductById(id));
            }
        });
    }, []);

    const onUpdateSize = useCallback((data: {id: string, quantity: number}) => {
        dispatch(updateSize(data)).then((res) => {
            if (res.meta.requestStatus == 'fulfilled') {
                if (id) dispatch(fetchProductById(id));
            }
        });
    }, []);

    const onDeleteProduct = () => {
        dispatch(deleteProduct()).then((res) => {
            if (res.meta.requestStatus === 'fulfilled')
                navigate(getRouteAdminProducts());
        });
    };

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
                selectedColors={selectedColors}
                sizes={productForm?.Sizes}
                imagesList={imagesList}
                addSize={addSize}
                updateForm={updateForm}
                onChangeColors={onChangeColors}
                updateImages={updateImages}
                deleteSize={onDeleteSize}
                updateSize={onUpdateSize}
            />

            <AdminFooter
                onUpdate={onUpdateProduct}
                onCancelEdit={() => console.log('Cancel Edit!')}
                onDelete={onDeleteProduct}
            />
        </VStack>
    );
});
