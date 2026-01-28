// import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";
// import { v4 as uuid } from "uuid";
// import { useFormBuilderStore } from "../state/useFormBuilderStore";

// /* ======================================================
//    HELPERS
// ====================================================== */
// interface FieldPaletteProps {
//   collapsed: boolean;
// }

// const EMAIL_REGEX = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
// const URL_REGEX =
//   "^(https?:\\/\\/)?([\\w\\-])+\\.([\\w\\-]+)([\\w\\-./?%&=]*)?$";
// const PHONE_REGEX = "^[0-9]{10,15}$";

// type WidgetType = NonNullable<CanonicalFieldConfig["ui"]>["widget"];

// function createBaseField(
//   key: string,
//   label: string,
//   dataType: CanonicalFieldConfig["data"]["type"],
//   widget: WidgetType,
//   category: CanonicalFieldConfig["meta"]["category"] = "INPUT",
// ): CanonicalFieldConfig {
//   return {
//     configVersion: 1,
//     meta: { key, label, category },
//     data: { type: dataType },
//     ui: { widget },
//   };
// }

// /* ======================================================
//    ADDRESS (STRUCTURED + DEPENDENT)
// ====================================================== */

// function createAddressFields(baseKey: string): CanonicalFieldConfig[] {
//   const ts = Date.now();

//   return [
//     createBaseField(
//       `${baseKey}_line1_${ts}`,
//       "Address Line 1",
//       "STRING",
//       "TEXT",
//     ),
//     createBaseField(
//       `${baseKey}_line2_${ts}`,
//       "Address Line 2",
//       "STRING",
//       "TEXT",
//     ),
//     createBaseField(`${baseKey}_city_${ts}`, "City", "STRING", "TEXT"),

//     {
//       ...createBaseField(
//         `${baseKey}_country_${ts}`,
//         "Country",
//         "STRING",
//         "SELECT",
//       ),
//       ui: {
//         widget: "SELECT",
//         options: [
//           { label: "India", value: "IN" },
//           { label: "United States", value: "US" },
//         ],
//       },
//     },

//     {
//       ...createBaseField(`${baseKey}_state_${ts}`, "State", "STRING", "SELECT"),
//       ui: {
//         widget: "SELECT",
//         dataSource: {
//           type: "DEPENDENT",
//           dependsOn: `${baseKey}_country_${ts}`,
//           resetOnChange: true,
//           map: {
//             IN: [
//               { label: "Karnataka", value: "KA" },
//               { label: "Delhi", value: "DL" },
//             ],
//             US: [
//               { label: "California", value: "CA" },
//               { label: "Texas", value: "TX" },
//             ],
//           },
//         },
//       },
//     },

//     createBaseField(`${baseKey}_zip_${ts}`, "Postal Code", "STRING", "TEXT"),
//   ];
// }

// /* ======================================================
//    COMPONENT
// ====================================================== */

// export function FieldPalette({ collapsed }: FieldPaletteProps) {
//   const {
//     addField,
//     addNodeToTarget,
//     addSection,
//     selectedSectionId,
//     selectedNodePath,
//     schema,
//   } = useFormBuilderStore();

//   /* ---------------- TARGET RESOLUTION ---------------- */

//   function resolveTarget() {
//     if (selectedNodePath?.slotId) {
//       return {
//         kind: "SLOT" as const,
//         sectionId: selectedNodePath.sectionId,
//         nodeId: selectedNodePath.nodeId,
//         slotId: selectedNodePath.slotId,
//       };
//     }

//     if (selectedNodePath?.nodeId) {
//       return {
//         kind: "NODE_CHILDREN" as const,
//         sectionId: selectedNodePath.sectionId,
//         nodeId: selectedNodePath.nodeId,
//       };
//     }

//     if (selectedSectionId) {
//       return { kind: "SECTION" as const, sectionId: selectedSectionId };
//     }

//     return {
//       kind: "SECTION" as const,
//       sectionId: schema.layout.sections[0]?.id,
//     };
//   }

//   function addFieldToForm(field: CanonicalFieldConfig) {
//     addField(field);

//     addNodeToTarget(
//       {
//         id: uuid(),
//         kind: "FIELD",
//         field: { key: field.meta.key },
//       },
//       resolveTarget(),
//     );
//   }

//   /* ======================================================
//      BASIC INPUTS
//   ====================================================== */

//   const addText = () =>
//     addFieldToForm(
//       createBaseField(`text_${Date.now()}`, "Text", "STRING", "TEXT"),
//     );

//   const addTextarea = () =>
//     addFieldToForm(
//       createBaseField(
//         `textarea_${Date.now()}`,
//         "Textarea",
//         "STRING",
//         "TEXTAREA",
//       ),
//     );

//   const addNumber = () =>
//     addFieldToForm(
//       createBaseField(`number_${Date.now()}`, "Number", "NUMBER", "NUMBER"),
//     );

//   const addCurrency = () =>
//     addFieldToForm(
//       createBaseField(
//         `currency_${Date.now()}`,
//         "Currency",
//         "NUMBER",
//         "CURRENCY",
//       ),
//     );

//   const addCheckbox = () =>
//     addFieldToForm(
//       createBaseField(
//         `checkbox_${Date.now()}`,
//         "Checkbox",
//         "BOOLEAN",
//         "CHECKBOX",
//       ),
//     );

//   /* ======================================================
//      SELECT / CHOICE
//   ====================================================== */

//   const addSelect = () =>
//     addFieldToForm({
//       ...createBaseField(`select_${Date.now()}`, "Select", "STRING", "SELECT"),
//       ui: {
//         widget: "SELECT",
//         options: [
//           { label: "Option A", value: "A" },
//           { label: "Option B", value: "B" },
//         ],
//       },
//     });

//   const addMultiSelect = () =>
//     addFieldToForm({
//       ...createBaseField(
//         `multi_${Date.now()}`,
//         "Multi Select",
//         "JSON",
//         "SELECT",
//       ),
//       ui: {
//         widget: "SELECT",
//         multiple: true,
//         options: [
//           { label: "Option A", value: "A" },
//           { label: "Option B", value: "B" },
//         ],
//       },
//     });

//   const addYesNo = () =>
//     addFieldToForm({
//       ...createBaseField(`yesno_${Date.now()}`, "Yes / No", "BOOLEAN", "RADIO"),
//       ui: {
//         widget: "RADIO",
//         options: [
//           { label: "Yes", value: "true" },
//           { label: "No", value: "false" },
//         ],
//       },
//     });

//   /* ======================================================
//      REAL WORLD
//   ====================================================== */

//   const addEmail = () =>
//     addFieldToForm({
//       ...createBaseField(`email_${Date.now()}`, "Email", "STRING", "TEXT"),
//       validation: { rules: [{ type: "EMAIL", message: "Invalid email" }] },
//     });

//   const addPhone = () =>
//     addFieldToForm({
//       ...createBaseField(`phone_${Date.now()}`, "Phone", "STRING", "TEXT"),
//       validation: {
//         rules: [
//           {
//             type: "REGEX",
//             params: { regex: PHONE_REGEX },
//             message: "Invalid phone number",
//           },
//         ],
//       },
//     });

//   const addURL = () =>
//     addFieldToForm({
//       ...createBaseField(`url_${Date.now()}`, "Website", "STRING", "TEXT"),
//       validation: {
//         rules: [
//           {
//             type: "REGEX",
//             params: { regex: URL_REGEX },
//             message: "Invalid URL",
//           },
//         ],
//       },
//     });

//   /* ======================================================
//      ADVANCED
//   ====================================================== */

//   const addCalculated = () =>
//     addFieldToForm({
//       configVersion: 1,
//       meta: {
//         key: `calc_${Date.now()}`,
//         label: "Calculated",
//         category: "CALCULATED",
//       },
//       data: { type: "NUMBER" },
//       ui: { widget: "NUMBER" },
//       calculation: {
//         operator: "ADD",
//         operands: [],
//       },
//     });

//   const addAddressStructured = () => {
//     const fields = createAddressFields("address");

//     fields.forEach((field) => {
//       addField(field);

//       addNodeToTarget(
//         {
//           id: uuid(),
//           kind: "FIELD",
//           field: { key: field.meta.key },
//         },
//         resolveTarget(),
//       );
//     });
//   };

//   const addAddressSimple = () =>
//     addFieldToForm(
//       createBaseField(`address_${Date.now()}`, "Address", "STRING", "TEXTAREA"),
//     );

//   /* ======================================================
//    MISSING BASIC FIELDS
// ====================================================== */

//   const addRichText = () =>
//     addFieldToForm(
//       createBaseField(
//         `richtext_${Date.now()}`,
//         "Rich Text",
//         "STRING",
//         "RICH_TEXT",
//       ),
//     );

//   const addDate = () =>
//     addFieldToForm(
//       createBaseField(`date_${Date.now()}`, "Date", "DATE", "DATE"),
//     );

//   const addDateTime = () =>
//     addFieldToForm(
//       createBaseField(
//         `datetime_${Date.now()}`,
//         "Date Time",
//         "DATETIME",
//         "DATETIME",
//       ),
//     );

//   /* ======================================================
//    FILE / NUMERIC / BUSINESS
// ====================================================== */

//   const addFile = () =>
//     addFieldToForm(
//       createBaseField(`file_${Date.now()}`, "File Upload", "JSON", "FILE"),
//     );

//   const addPercentage = () =>
//     addFieldToForm({
//       ...createBaseField(
//         `percent_${Date.now()}`,
//         "Percentage",
//         "NUMBER",
//         "NUMBER",
//       ),
//       ui: {
//         widget: "NUMBER",
//         format: { style: "percent" },
//       },
//     });

//   const addRating = () =>
//     addFieldToForm({
//       ...createBaseField(`rating_${Date.now()}`, "Rating", "NUMBER", "NUMBER"),
//       data: { type: "NUMBER", precision: 1 },
//       ui: {
//         widget: "NUMBER",
//         helpText: "Rating (e.g. 4.5)",
//       },
//     });

//   const addStatus = () =>
//     addFieldToForm({
//       configVersion: 1,
//       meta: {
//         key: `status_${Date.now()}`,
//         label: "Status",
//         category: "SYSTEM",
//       },
//       data: { type: "STRING" },
//       ui: {
//         widget: "SELECT",
//         options: [
//           { label: "Draft", value: "DRAFT" },
//           { label: "Submitted", value: "SUBMITTED" },
//           { label: "Approved", value: "APPROVED" },
//           { label: "Rejected", value: "REJECTED" },
//         ],
//       },
//     });

//   // const addReference = () =>
//   //   addFieldToForm({
//   //     configVersion: 1,
//   //     meta: {
//   //       key: `ref_${Date.now()}`,
//   //       label: "Reference",
//   //       category: "REFERENCE",
//   //     },
//   //     data: { type: "STRING" },
//   //     ui: {
//   //       widget: "SELECT",
//   //       helpText: "Reference to another object (API-backed)",
//   //     },
//   //     behavior: {
//   //       source: "remote", // future API hookup
//   //     },
//   //   });
//   const addReference = () =>
//   addFieldToForm({
//     configVersion: 1,
//     meta: {
//       key: `ref_${Date.now()}`,
//       label: "Reference",
//       category: "REFERENCE",
//     },
//     data: { type: "STRING" },
//     ui: { widget: "SELECT" },
//     reference: {
//       resource: "",
//       valueField: "",
//       labelField: "",
//       searchable: true,
//       multiple:false
//     },
//   });

//   /* ======================================================
//      LAYOUT
//   ====================================================== */

//   const addRepeater = () =>
//     addNodeToTarget(
//       { id: uuid(), kind: "LAYOUT", type: "repeater", children: [] },
//       resolveTarget(),
//     );

//   const addColumns = () =>
//     addNodeToTarget(
//       {
//         id: uuid(),
//         kind: "LAYOUT",
//         type: "columns",
//         slots: [
//           { id: uuid(), children: [] },
//           { id: uuid(), children: [] },
//         ],
//       },
//       resolveTarget(),
//     );

//   const addTabs = () =>
//     addNodeToTarget(
//       {
//         id: uuid(),
//         kind: "LAYOUT",
//         type: "tabs",
//         slots: [
//           { id: uuid(), title: "Tab 1", children: [] },
//           { id: uuid(), title: "Tab 2", children: [] },
//         ],
//       },
//       resolveTarget(),
//     );

//   /* ======================================================
//      UI
//   ====================================================== */

//   return (
//     <div className="space-y-6">
//       {/* Sections */}
//       <div>
//         <h4 className="font-semibold mb-2">Sections</h4>
//         <button
//           onClick={addSection}
//           className="w-full border border-dashed p-2 text-sm rounded"
//         >
//           ➕ Add Section
//         </button>
//       </div>

//       {/* Fields */}
//       <h4 className="font-semibold">Fields</h4>
//       <button onClick={addText}>Text</button>
//       <button onClick={addTextarea}>Textarea</button>
//       <button onClick={addNumber}>Number</button>
//       <button onClick={addCurrency}>Currency</button>
//       <button onClick={addCheckbox}>Checkbox</button>
//       <button onClick={addSelect}>Select</button>
//       <button onClick={addMultiSelect}>Multi Select</button>
//       <button onClick={addYesNo}>Yes / No</button>
//       <button onClick={addRichText}>Rich Text</button>
//       <button onClick={addDate}>Date</button>
//       <button onClick={addDateTime}>Date Time</button>

//       {/* Business */}
//       <h4 className="font-semibold">Business</h4>
//       <button onClick={addEmail}>Email</button>
//       <button onClick={addPhone}>Phone</button>
//       <button onClick={addURL}>URL</button>
//       <button onClick={addCalculated}>Calculated</button>
//       <button onClick={addFile}>File Upload</button>
//       <button onClick={addPercentage}>Percentage</button>
//       <button onClick={addRating}>Rating</button>
//       <button onClick={addStatus}>Status</button>
//       <button onClick={addReference}>Reference</button>

//       <button onClick={addAddressStructured}>Address (Structured)</button>
//       <button onClick={addAddressSimple}>Address (Single Field)</button>

//       {/* Layout */}
//       <h4 className="font-semibold">Layout</h4>
//       <button onClick={addRepeater}>Repeater</button>
//       <button onClick={addColumns}>Columns</button>
//       <button onClick={addTabs}>Tabs</button>
//     </div>
//   );
// }

import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";
import { v4 as uuid } from "uuid";
import { useFormBuilderStore } from "../state/useFormBuilderStore";
import {
  Type,
  TextCursorInput,
  Hash,
  DollarSign,
  CheckSquare,
  ChevronDown,
  Check,
  Mail,
  Phone,
  Link,
  Calculator,
  MapPin,
  FileText,
  Percent,
  Star,
  CircleDot,
  Calendar,
  CalendarDays,
  Bold,
  Columns,
  Repeat,
  Layers,
  Plus,
  Building,
  FileUp,
  Flag,
  Users,
  Table,
} from "lucide-react";

interface FieldPaletteProps {
  collapsed: boolean;
}

const EMAIL_REGEX = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
const URL_REGEX =
  "^(https?:\\/\\/)?([\\w\\-])+\\.([\\w\\-]+)([\\w\\-./?%&=]*)?$";
const PHONE_REGEX = "^[0-9]{10,15}$";

type WidgetType = NonNullable<CanonicalFieldConfig["ui"]>["widget"];

function createBaseField(
  key: string,
  label: string,
  dataType: CanonicalFieldConfig["data"]["type"],
  widget: WidgetType,
  category: CanonicalFieldConfig["meta"]["category"] = "INPUT",
): CanonicalFieldConfig {
  return {
    configVersion: 1,
    meta: { key, label, category },
    data: { type: dataType },
    ui: { widget },
  };
}

function createAddressFields(baseKey: string): CanonicalFieldConfig[] {
  const ts = Date.now();

  return [
    createBaseField(
      `${baseKey}_line1_${ts}`,
      "Address Line 1",
      "STRING",
      "TEXT",
    ),
    createBaseField(
      `${baseKey}_line2_${ts}`,
      "Address Line 2",
      "STRING",
      "TEXT",
    ),
    createBaseField(`${baseKey}_city_${ts}`, "City", "STRING", "TEXT"),
    {
      ...createBaseField(
        `${baseKey}_country_${ts}`,
        "Country",
        "STRING",
        "SELECT",
      ),
      ui: {
        widget: "SELECT",
        options: [
          { label: "India", value: "IN" },
          { label: "United States", value: "US" },
        ],
      },
    },
    {
      ...createBaseField(`${baseKey}_state_${ts}`, "State", "STRING", "SELECT"),
      ui: {
        widget: "SELECT",
      },
      integration: {
        dataSource: {
          type: "DEPENDENT",
          dependsOn: `${baseKey}_country_${ts}`,
          resetOnChange: true,
          map: {
            IN: [
              { label: "Karnataka", value: "KA" },
              { label: "Delhi", value: "DL" },
            ],
            US: [
              { label: "California", value: "CA" },
              { label: "Texas", value: "TX" },
            ],
          },
        },
      },
    },
    createBaseField(`${baseKey}_zip_${ts}`, "Postal Code", "STRING", "TEXT"),
  ];
}

export function FieldPalette({ collapsed }: FieldPaletteProps) {
  const {
    addField,
    addNodeToTarget,
    addSection,
    selectedSectionId,
    selectedNodePath,
    schema,
  } = useFormBuilderStore();

  function resolveTarget() {
    if (selectedNodePath?.slotId) {
      return {
        kind: "SLOT" as const,
        sectionId: selectedNodePath.sectionId,
        nodeId: selectedNodePath.nodeId,
        slotId: selectedNodePath.slotId,
      };
    }

    if (selectedNodePath?.nodeId) {
      return {
        kind: "NODE_CHILDREN" as const,
        sectionId: selectedNodePath.sectionId,
        nodeId: selectedNodePath.nodeId,
      };
    }

    if (selectedSectionId) {
      return { kind: "SECTION" as const, sectionId: selectedSectionId };
    }

    return {
      kind: "SECTION" as const,
      sectionId: schema.layout.sections[0]?.id,
    };
  }

  function addFieldToForm(field: CanonicalFieldConfig) {
    addField(field);
    addNodeToTarget(
      {
        id: uuid(),
        kind: "FIELD",
        field: { key: field.meta.key },
      },
      resolveTarget(),
    );
  }

  const addText = () =>
    addFieldToForm(
      createBaseField(`text_${Date.now()}`, "Text", "STRING", "TEXT"),
    );

  const addTextarea = () =>
    addFieldToForm(
      createBaseField(
        `textarea_${Date.now()}`,
        "Textarea",
        "STRING",
        "TEXTAREA",
      ),
    );

  const addNumber = () =>
    addFieldToForm(
      createBaseField(`number_${Date.now()}`, "Number", "NUMBER", "NUMBER"),
    );

  const addCurrency = () =>
    addFieldToForm(
      createBaseField(
        `currency_${Date.now()}`,
        "Currency",
        "NUMBER",
        "CURRENCY",
      ),
    );

  const addCheckbox = () =>
    addFieldToForm(
      createBaseField(
        `checkbox_${Date.now()}`,
        "Checkbox",
        "BOOLEAN",
        "CHECKBOX",
      ),
    );

  const addSelect = () =>
    addFieldToForm({
      ...createBaseField(`select_${Date.now()}`, "Select", "STRING", "SELECT"),
      ui: {
        widget: "SELECT",
        options: [
          { label: "Option A", value: "A" },
          { label: "Option B", value: "B" },
        ],
      },
    });

  const addMultiSelect = () =>
    addFieldToForm({
      ...createBaseField(
        `multi_${Date.now()}`,
        "Multi Select",
        "JSON",
        "SELECT",
      ),
      ui: {
        widget: "SELECT",
        multiple: true,
        options: [
          { label: "Option A", value: "A" },
          { label: "Option B", value: "B" },
        ],
      },
    });

  const addYesNo = () =>
    addFieldToForm({
      ...createBaseField(`yesno_${Date.now()}`, "Yes / No", "BOOLEAN", "RADIO"),
      ui: {
        widget: "RADIO",
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    });

  const addEmail = () =>
    addFieldToForm({
      ...createBaseField(`email_${Date.now()}`, "Email", "STRING", "TEXT"),
      validation: { rules: [{ type: "EMAIL", message: "Invalid email" }] },
    });

  const addPhone = () =>
    addFieldToForm({
      ...createBaseField(`phone_${Date.now()}`, "Phone", "STRING", "TEXT"),
      validation: {
        rules: [
          {
            type: "REGEX",
            params: { regex: PHONE_REGEX },
            message: "Invalid phone number",
          },
        ],
      },
    });

  const addURL = () =>
    addFieldToForm({
      ...createBaseField(`url_${Date.now()}`, "Website", "STRING", "TEXT"),
      validation: {
        rules: [
          {
            type: "REGEX",
            params: { regex: URL_REGEX },
            message: "Invalid URL",
          },
        ],
      },
    });

  const addCalculated = () =>
    addFieldToForm({
      configVersion: 1,
      meta: {
        key: `calc_${Date.now()}`,
        label: "Calculated",
        category: "CALCULATED",
      },
      data: { type: "NUMBER" },
      ui: { widget: "NUMBER" },
      calculation: {
        operator: "ADD",
        operands: [],
      },
    });

  const addAddressStructured = () => {
    const fields = createAddressFields("address");
    fields.forEach((field) => {
      addField(field);
      addNodeToTarget(
        {
          id: uuid(),
          kind: "FIELD",
          field: { key: field.meta.key },
        },
        resolveTarget(),
      );
    });
  };

  const addAddressSimple = () =>
    addFieldToForm(
      createBaseField(`address_${Date.now()}`, "Address", "STRING", "TEXTAREA"),
    );

  const addRichText = () =>
    addFieldToForm(
      createBaseField(
        `richtext_${Date.now()}`,
        "Rich Text",
        "STRING",
        "RICH_TEXT",
      ),
    );

  const addDate = () =>
    addFieldToForm(
      createBaseField(`date_${Date.now()}`, "Date", "DATE", "DATE"),
    );

  const addDateTime = () =>
    addFieldToForm(
      createBaseField(
        `datetime_${Date.now()}`,
        "Date Time",
        "DATETIME",
        "DATETIME",
      ),
    );

  const addFile = () =>
    addFieldToForm(
      createBaseField(`file_${Date.now()}`, "File Upload", "JSON", "FILE"),
    );

  const addPercentage = () =>
    addFieldToForm({
      ...createBaseField(
        `percent_${Date.now()}`,
        "Percentage",
        "NUMBER",
        "NUMBER",
      ),
      ui: {
        widget: "NUMBER",
        format: { style: "percent" },
      },
    });

  const addRating = () =>
    addFieldToForm({
      ...createBaseField(`rating_${Date.now()}`, "Rating", "NUMBER", "NUMBER"),
      data: { type: "NUMBER", precision: 1 },
      ui: {
        widget: "NUMBER",
        helpText: "Rating (e.g. 4.5)",
      },
    });

  const addStatus = () =>
    addFieldToForm({
      configVersion: 1,
      meta: {
        key: `status_${Date.now()}`,
        label: "Status",
        category: "SYSTEM",
      },
      data: { type: "STRING" },
      ui: {
        widget: "SELECT",
        options: [
          { label: "Draft", value: "DRAFT" },
          { label: "Submitted", value: "SUBMITTED" },
          { label: "Approved", value: "APPROVED" },
          { label: "Rejected", value: "REJECTED" },
        ],
      },
    });

  const addReference = () =>
    addFieldToForm({
      configVersion: 1,
      meta: {
        key: `ref_${Date.now()}`,
        label: "Reference",
        category: "REFERENCE",
      },
      data: { type: "STRING" },
      ui: { widget: "SELECT" },
      integration: {
        reference: {
          resource: "", // resource id
          valueField: "", // field key in target object
          labelField: "", // field key to display
          searchable: true,
          multiple: false,
        },
      },
    });

  const addRepeater = () =>
    addNodeToTarget(
      { id: uuid(), kind: "LAYOUT", type: "repeater", children: [] },
      resolveTarget(),
    );

  const addColumns = () =>
    addNodeToTarget(
      {
        id: uuid(),
        kind: "LAYOUT",
        type: "columns",
        slots: [
          { id: uuid(), children: [] },
          { id: uuid(), children: [] },
        ],
      },
      resolveTarget(),
    );

  const addTabs = () =>
    addNodeToTarget(
      {
        id: uuid(),
        kind: "LAYOUT",
        type: "tabs",
        slots: [
          { id: uuid(), title: "Tab 1", children: [] },
          { id: uuid(), title: "Tab 2", children: [] },
        ],
      },
      resolveTarget(),
    );

  if (collapsed) {
    return (
      <div className="py-3 px-1.5 flex flex-col items-center gap-1.5">
        <button
          onClick={addSection}
          className="w-10 h-10 flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 border border-dashed border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-colors duration-150"
          title="Add Section"
        >
          <Layers className="w-4 h-4 text-blue-600" />
        </button>

        <div className="h-px w-6 bg-gray-200 my-1" />

        <button
          onClick={addText}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Text Field"
        >
          <Type className="w-4 h-4 text-gray-700" />
        </button>

        <button
          onClick={addNumber}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Number"
        >
          <Hash className="w-4 h-4 text-gray-700" />
        </button>

        <button
          onClick={addSelect}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Select"
        >
          <ChevronDown className="w-4 h-4 text-gray-700" />
        </button>

        <div className="h-px w-6 bg-gray-200 my-1" />

        <button
          onClick={addEmail}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Email"
        >
          <Mail className="w-4 h-4 text-gray-700" />
        </button>

        <button
          onClick={addDate}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Date"
        >
          <Calendar className="w-4 h-4 text-gray-700" />
        </button>

        <div className="h-px w-6 bg-gray-200 my-1" />

        <button
          onClick={addColumns}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-150"
          title="Columns"
        >
          <Columns className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4 overflow-y-auto h-full scrollbar-hide">
      {/* Sections */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Sections</h3>
        </div>
        <button
          onClick={addSection}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-linear-to-r from-blue-50 to-indigo-50 border border-dashed border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-150"
        >
          <Layers className="w-3.5 h-3.5" />
          Add Section
        </button>
      </div>

      {/* Basic Inputs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Basic Inputs</h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
            Common
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addText}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <Type className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Text</p>
            </div>
          </button>

          <button
            onClick={addTextarea}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <TextCursorInput className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Textarea</p>
            </div>
          </button>

          <button
            onClick={addNumber}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <Hash className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Number</p>
            </div>
          </button>

          <button
            onClick={addCurrency}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Currency</p>
            </div>
          </button>

          <button
            onClick={addCheckbox}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Checkbox</p>
            </div>
          </button>

          <button
            onClick={addRichText}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center shrink-0">
              <Bold className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Rich Text</p>
            </div>
          </button>
        </div>
      </div>

      {/* Select & Choice */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Select & Choice
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
            Options
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addSelect}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-purple-50 rounded flex items-center justify-center shrink-0">
              <ChevronDown className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Select</p>
            </div>
          </button>

          <button
            onClick={addMultiSelect}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-purple-50 rounded flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Multi Select</p>
            </div>
          </button>

          <button
            onClick={addYesNo}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-purple-50 rounded flex items-center justify-center shrink-0">
              <CircleDot className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Yes / No</p>
            </div>
          </button>
        </div>
      </div>

      {/* Date & Time */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Date & Time</h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
            Temporal
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addDate}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-amber-50 rounded flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Date</p>
            </div>
          </button>

          <button
            onClick={addDateTime}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-amber-50 rounded flex items-center justify-center shrink-0">
              <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Date Time</p>
            </div>
          </button>
        </div>
      </div>

      {/* Business Fields */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Business Fields
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
            Enterprise
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addEmail}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Email</p>
            </div>
          </button>

          <button
            onClick={addPhone}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Phone</p>
            </div>
          </button>

          <button
            onClick={addURL}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <Link className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Website</p>
            </div>
          </button>

          <button
            onClick={addFile}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <FileUp className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">File Upload</p>
            </div>
          </button>

          <button
            onClick={addPercentage}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <Percent className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Percentage</p>
            </div>
          </button>

          <button
            onClick={addRating}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-green-50 rounded flex items-center justify-center shrink-0">
              <Star className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Rating</p>
            </div>
          </button>
        </div>
      </div>

      {/* Advanced Fields */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Advanced Fields
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded">
            Pro
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addCalculated}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center shrink-0">
              <Calculator className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Calculated</p>
            </div>
          </button>

          <button
            onClick={addAddressStructured}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center shrink-0">
              <Building className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">
                Structured Address
              </p>
            </div>
          </button>

          <button
            onClick={addAddressSimple}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">
                Simple Address
              </p>
            </div>
          </button>

          <button
            onClick={addStatus}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center shrink-0">
              <Flag className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Status</p>
            </div>
          </button>

          <button
            onClick={addReference}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Reference</p>
            </div>
          </button>
        </div>
      </div>

      {/* Layout Components */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Layout Components
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded">
            Structure
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={addRepeater}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-indigo-50 rounded flex items-center justify-center shrink-0">
              <Repeat className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Repeater</p>
            </div>
          </button>

          <button
            onClick={addColumns}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-indigo-50 rounded flex items-center justify-center shrink-0">
              <Columns className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Columns</p>
            </div>
          </button>

          <button
            onClick={addTabs}
            className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all duration-150"
          >
            <div className="w-7 h-7 bg-indigo-50 rounded flex items-center justify-center shrink-0">
              <Table className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-900">Tabs</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
