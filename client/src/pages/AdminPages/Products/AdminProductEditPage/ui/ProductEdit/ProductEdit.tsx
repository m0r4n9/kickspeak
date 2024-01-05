import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductEdit.module.scss';
import { getAdminProductDetailsData } from '../../model/selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';
import { fetchProductById } from '../../model/services/fetchProductById.ts';
import { EditProductCard } from '../EditProductCard/EditProductCard.tsx';
import { updateProduct } from '../../model/services/updateProduct.ts';
import { deleteProduct } from '../../model/services/deleteProduct.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import type { IconType } from 'antd/es/notification/interface';
import { useNavigate } from 'react-router-dom';
import { AdminFooter } from '@/features/Admin/adminFooter/index.ts';
import { Button, notification, Upload } from 'antd';
import { Product, SizeProduct } from '@/entities/Product';
import { getRouteAdminProducts } from '@/shared/const/route.ts';
import { UploadOutlined } from '@ant-design/icons';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { VStack } from '@/shared/ui/Stack/index.ts';
import type { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

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
    const [newSizes, setNewSizes] = useState<SizeProduct[]>([]);
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

    const updateImages = (info: UploadChangeParam) => {
        setImagesList(info.fileList);
        if (info.file.status === 'removed') {
            setDeletedImages((prevState) => [...prevState, info.file.uid]);
        }
    };

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
                newSizes={newSizes}
                updateForm={updateForm}
                onChangeColors={onChangeColors}
            />
            
            <div
                style={{
                    marginTop: 16,
                }}
            >
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    fileList={imagesList}
                    beforeUpload={() => false}
                    onChange={updateImages}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </div>

            <AdminFooter
                onUpdate={onUpdateProduct}
                onCancelEdit={() => console.log('Cancel Edit!')}
                onDelete={onDeleteProduct}
            />
        </VStack>
    );
});
