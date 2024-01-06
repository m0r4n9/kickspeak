import { Form } from 'antd';
import { useState } from 'react';
import { Product } from '@/entities/Product';
import { Brand } from '@/entities/Brand';

interface useAdminTable {}

export function useAdminTable<T extends Brand | Product>() {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: T) => {
        return record.id === editingKey;
    };

    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record: T) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record!.id);
    };

    return {
        form,
        editingKey,
        setEditingKey,
        isEditing,
        cancel,
        edit,
    };
}
