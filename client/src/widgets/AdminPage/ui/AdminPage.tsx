import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './AdminPage.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
    Form,
    FormInstance,
    Input,
    InputNumber,
    Pagination,
    PaginationProps,
    Table,
} from 'antd';
import { Brand } from '@/entities/Brand';
import { CreateEntity, SearchAdmin } from '@/features/Admin/AdminRightbar';

interface AdminPageProps {
    data: any;
    columns: any;
    form: FormInstance<any>;
    isEditing: (data: any) => boolean;

    totalItems: number;
    linkToCreate: string;
    entityName?: string;

    page: number;
    itemsPerPage?: number;
    setPage: (page: number) => void;

    query?: string;
    search?: (query: string) => void;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Brand;
    index: number;
    children: ReactNode;
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}: EditableCellProps) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Заполните поле ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

function AdminPageGeneric(props: AdminPageProps) {
    const {
        data,
        columns,
        form,
        page,
        itemsPerPage,
        totalItems,
        linkToCreate,
        entityName,
        query,
        search,
        isEditing,
        setPage,
    } = props;

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setPage(pageNumber);
    };

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Brand) => ({
                record,
                inputType:
                    col.dataIndex === 'foundation' || col.dataIndex === 'price'
                        ? 'number'
                        : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <HStack max align="start">
            <VStack max align="center" gap="16" className={cls.AdminPage}>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        className={cls.test}
                        rowClassName="editable-row"
                        dataSource={data}
                        columns={mergedColumns}
                        rowKey={(record) => record.id}
                        pagination={false}
                    />
                </Form>

                <Pagination
                    showQuickJumper
                    defaultCurrent={page}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={onChange}
                />
            </VStack>

            <VStack gap='16' className={cls.toolBar}>
                <h2>ToolBar</h2>
                <CreateEntity
                    createRoute={linkToCreate}
                    entityName={entityName}
                />
                <SearchAdmin query={query} search={search}/>
            </VStack>
        </HStack>
    );
}

export const AdminPage = memo(AdminPageGeneric);
