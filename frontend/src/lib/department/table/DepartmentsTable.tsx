"use client";

import { DataTable } from "@/components/table/data-table";
import { departmentColumns } from "./columns";
import { useDepartments, useCreateDepartment } from "../hooks/useDepartment";
import { CreateButton } from "@/components/table/create-button";
import { DepartmentForm } from "../form/create-department";
import { createDepartmentSchema } from "../schema/department-schema";
import { useZodForm } from "@/hooks/useZodForm";

export default function DepartmentsTable() {
    const { data = [], isLoading } = useDepartments();
    const createDepartment = useCreateDepartment();
    const tableFilters = [
        {
            type: "single",
            columnId: "status",
            title: "Status",
            options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
            ],
        },
        {
            type: "date",
            columnId: "createdAt",
            title: "Created Date",
        },
    ];

    const { form, errors, touched, setValue, onBlur, validateForm, reset } =
        useZodForm(createDepartmentSchema, {
            name: "",
            code: "",
            description: "",
            status: "ACTIVE"
        });

    const handleSubmit = (close: () => void) => {
        const result = validateForm();
        if (!result.success) return;

        createDepartment.mutate(result.data, {
            onSuccess: () => {
                reset();
                close();
            },
        });
    };

    return (
        <DataTable
            columns={departmentColumns}
            data={data}
            total={data.length}
            loading={isLoading}
            filters={tableFilters}
            createButton={<CreateButton
                triggerText="Add Department"
                title="Create Department"
                onSubmit={handleSubmit}
                onOpenReset={reset}
            >
                {() => (
                    <DepartmentForm
                        form={form}
                        errors={errors}
                        touched={touched}
                        setValue={setValue}
                        onBlur={onBlur} />
                )}
            </CreateButton>} page={0} pageSize={0} search={""} />
    );
}
