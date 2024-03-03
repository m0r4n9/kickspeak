import { memo, useCallback, useEffect, useState } from 'react';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import cls from './AdminProductCreatePage.module.scss';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { productCreateReducer } from '../../model/slice/productCreateSlice.ts';
import { VStack } from '@/shared/ui/Stack';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { AdminFooter } from '@/features/Admin/adminFooter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { createProduct } from '@/pages/AdminPages/Products/AdminProductCreatePage/model/services/createProduct.ts';
import { ProductCreateFields } from '@/pages/AdminPages/Products/AdminProductCreatePage/ui/ProductCreateFields/ProductCreateFields.tsx';
import { useNavigate } from 'react-router-dom';
import { getRouteAdminProductDetails } from '@/shared/const/route.ts';
import axios from 'axios';

const reducer: ReducerList = {
    adminProductCreate: productCreateReducer,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

type typeSex = 'W' | 'U' | 'M';
const AdminProductCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [sex, setSex] = useState<typeSex>('U');
    const [code, setCode] = useState('');
    const [imagesProduct, setImagesProduct] = useState<UploadFile[]>([]);
    const [brand, setBrand] = useState('');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [colors, setColors] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/catalog/colors`);
                setColors(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchColors();
    }, []);

    const onChange: UploadProps['onChange'] = useCallback(
        ({ fileList: newFileList }: any) => {
            setImagesProduct(newFileList);
        },
        [],
    );

    const onChangeBrand = useCallback((value: string) => {
        setBrand(value);
    }, []);

    const onChangeName = useCallback((value: string) => {
        setName(value);
    }, []);

    const onChangePrice = useCallback((value: string) => {
        setPrice(Number(value));
    }, []);

    const onChangeCode = useCallback((value: string) => {
        setCode(value);
    }, []);

    const onChangeSex = useCallback((type: typeSex) => {
        setSex(type);
    }, []);

    const onChangeColors = useCallback((color: string[]) => {
        setSelectedColors(color);
    }, []);

    const onCreateProduct = () => {
        dispatch(
            createProduct({
                name,
                brandId: brand,
                price,
                code,
                sex,
                colors: selectedColors,
                images: imagesProduct,
            }),
        ).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                if (res.payload && 'id' in res.payload) {
                    navigate(getRouteAdminProductDetails(res.payload.id));
                }
            }
        });
    };

    return (
        <DynamicModuleLoader reducers={reducer}>
            <WrapperAdminPage activeLink="products">
                <VStack className={cls.AdminProductCreatePage}>
                    <VStack className={cls.header}>
                        <h1>Добавить продукт</h1>
                    </VStack>
                    <ProductCreateFields
                        colors={colors}
                        name={name}
                        brand={brand}
                        price={price}
                        code={code}
                        selectedColors={selectedColors}
                        onChangeName={onChangeName}
                        onChangeBrand={onChangeBrand}
                        onChangePrice={onChangePrice}
                        onChangeCode={onChangeCode}
                        onChangeSex={onChangeSex}
                        onChangeColors={onChangeColors}
                        uploadImages={onChange}
                    />
                    <AdminFooter
                        className={cls.test}
                        onCancelEdit={() => {
                            console.log('Cancel!');
                        }}
                        onUpdate={onCreateProduct}
                    />
                </VStack>
            </WrapperAdminPage>
        </DynamicModuleLoader>
    );
};

export default memo(AdminProductCreatePage);
