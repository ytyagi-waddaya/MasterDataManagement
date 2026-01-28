// "use client";

// import { FormCanvas } from "@/components/form-builder/editor/FormCanvas";
// import { useFormBuilderStore } from "@/components/form-builder/state/useFormBuilderStore";
// import { compileForm } from "@/components/form-builder/compiler/compilerForm";
// import { FieldPalette } from "@/components/form-builder/components/FieldPalette";
// import { FieldConfigPanel } from "@/components/form-builder/field-config/FieldConfigPanel";
// import { FormRenderer } from "@/components/form-builder/runtime/FormRenderer";

// /* ======================================================
//    PAGE
// ====================================================== */

// export default function FormBuilderPage() {
//   const {
//     schema,
//     fieldConfigs,
//     undo,
//     redo,
//     history,
//     future,
//     mode,
//     setMode,
//   } = useFormBuilderStore();

//   async function handlePublish() {
//     const payload = compileForm({
//       schema,
//       fieldConfigs,
//       publish: true,
//     });

//     console.log("Publishing payload:", payload);
//   }

//   return (
//     <div className="h-screen flex flex-col">
//       {/* ==================================================
//           TOP TOOLBAR
//       ================================================== */}
//       <div className="flex items-center justify-between border-b px-4 py-2 bg-white">
//         {/* LEFT */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={undo}
//             disabled={history.length === 0}
//             className="px-3 py-1 border rounded text-sm disabled:opacity-40"
//           >
//             ⟲ Undo
//           </button>

//           <button
//             onClick={redo}
//             disabled={future.length === 0}
//             className="px-3 py-1 border rounded text-sm disabled:opacity-40"
//           >
//             ⟳ Redo
//           </button>

//           <div className="w-px h-6 bg-gray-300 mx-2" />

//           <button
//             onClick={() => setMode("EDIT")}
//             className={`px-3 py-1 border rounded text-sm ${
//               mode === "EDIT" ? "bg-black text-white" : ""
//             }`}
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => setMode("PREVIEW")}
//             className={`px-3 py-1 border rounded text-sm ${
//               mode === "PREVIEW" ? "bg-black text-white" : ""
//             }`}
//           >
//             Preview
//           </button>

//           <button
//             onClick={() => setMode("SPLIT")}
//             className={`px-3 py-1 border rounded text-sm ${
//               mode === "SPLIT" ? "bg-black text-white" : ""
//             }`}
//           >
//             Split
//           </button>
//         </div>

//         {/* RIGHT */}
//         <button
//           onClick={handlePublish}
//           className="bg-black text-white px-4 py-2 rounded"
//         >
//           Publish
//         </button>
//       </div>

//       {/* ==================================================
//           MAIN LAYOUT
//       ================================================== */}
//       <div className="flex-1 grid grid-cols-[250px_1fr_350px]">
//         {/* LEFT: FIELD PALETTE */}
//         <div className="border-r p-4 overflow-auto">
//           <FieldPalette />
//         </div>

//         {/* CENTER: EDIT / PREVIEW / SPLIT */}
//         <div className="overflow-auto p-6">
//           {mode === "EDIT" && <FormCanvas />}

//           {mode === "PREVIEW" && (
//             <FormRenderer
//               schema={schema}
//               fields={fieldConfigs}
//               preview
//             />
//           )}

//           {mode === "SPLIT" && (
//             <div className="grid grid-cols-2 gap-4 h-full">
//               {/* EDIT */}
//               <div className="border-r pr-4 overflow-auto">
//                 <FormCanvas />
//               </div>

//               {/* PREVIEW */}
//               <div className="bg-gray-50 p-4 overflow-auto">
//                 <FormRenderer
//                   schema={schema}
//                   fields={fieldConfigs}
//                   preview
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT: FIELD CONFIG */}
//         <div className="border-l overflow-auto">
//           <FieldConfigPanel />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { FormCanvas } from "@/components/form-builder/editor/FormCanvas";
import { useFormBuilderStore } from "@/components/form-builder/state/useFormBuilderStore";
import { compileForm } from "@/components/form-builder/compiler/compilerForm";
import { FieldPalette } from "@/components/form-builder/components/FieldPalette";
import { FieldConfigPanel } from "@/components/form-builder/field-config/FieldConfigPanel";
import { FormRenderer } from "@/components/form-builder/runtime/FormRenderer";
import {
  Layout,
  SplitSquareVertical,
  Undo2,
  Redo2,
  Send,
  Download,
  Save,
  Zap,
  ChevronRight,
  Check,
  FileText,
  Eye,
  ChevronLeft,
  Clock,
  Shield,
  Cpu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useMasterObjectForEditor,
  useUpdateMasterObject,
} from "@/lib/masterObject/hook";
import { normalizeMasterObjectFromBackend } from "@/components/form-builder/normalizeMasterObject";
import { Button } from "@/components/ui/button";
import { usePublishMasterObject } from "@/lib/masterObject/hook/useMasterObject";

export default function FormBuilderPage() {
  const params = useParams<{ id: string }>();
  const masterObjectId = params.id;
  const {
    schemaId,
    schema,
    fieldConfigs,
    undo,
    redo,
    history,
    future,
    mode,
    setMode,
    hydrateFromBackend,
    resetBuilder,
  } = useFormBuilderStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [configPanelCollapsed, setConfigPanelCollapsed] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const updateMasterObject = useUpdateMasterObject();
  const publishMasterObject = usePublishMasterObject();

  const { data } = useMasterObjectForEditor(masterObjectId);

  async function handleSaveDraft() {
    try {
      const payload = compileForm({
        schema,
        fieldConfigs,
      });
console.log("PAYLOAD M:", payload);

      const res = await updateMasterObject.mutateAsync({
        masterObjectId,
        payload,
      });

      /**
       * ✅ Capture backend draft identity
       */
      useFormBuilderStore.setState({
        schemaId: res.id,
      });

      setShowSaveDialog(true);
    } catch (error) {
      console.error("Save draft failed:", error);
    }
  }

  useEffect(() => {
    if (!data) return;

    const normalized = normalizeMasterObjectFromBackend(data, "EDITOR");

    if (!normalized.schema) {
      resetBuilder();
      return;
    }

    hydrateFromBackend(
      data.activeSchema?.id,
      normalized.schema,
      normalized.fieldConfigs,
      normalized.published,
    );
  }, [data, hydrateFromBackend, resetBuilder]);

  function handlePublish() {
    setShowPublishDialog(true);
  }

  // async function handleConfirmPublish() {
  //   try {
  //     if (!lastSavedDraftPayload?.draftSchemaId) {
  //       throw new Error("Please save draft before publishing");
  //     }

  //     await publishMasterObject.mutateAsync({
  //       masterObjectId,
  //       draftSchemaId: lastSavedDraftPayload.draftSchemaId,
  //     });

  //     setShowPublishDialog(false);
  //   } catch (error) {
  //     console.error("Publish failed:", error);
  //   }
  // }
  async function handleConfirmPublish() {
    try {
      if (!schemaId) {
        throw new Error("No draft schema found. Please save draft first.");
      }

      await publishMasterObject.mutateAsync({
        masterObjectId,
        draftSchemaId: schemaId, // ✅ DIRECT FROM STORE
      });

      setShowPublishDialog(false);
    } catch (error) {
      console.error("Publish failed:", error);
    }
  }

  const views = [
    {
      id: "EDIT",
      label: "Design",
      icon: Layout,
      description: "Build and edit your form",
    },
    {
      id: "PREVIEW",
      label: "Preview",
      icon: Eye,
      description: "Test form appearance",
    },
    {
      id: "SPLIT",
      label: "Split View",
      icon: SplitSquareVertical,
      description: "Edit and preview simultaneously",
    },
  ] as const;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Save Success Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in shadow-2xl border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-linear-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-green-50">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Draft Saved
              </h3>
              <p className="text-gray-600 mb-8">
                Your form has been saved successfully and is ready to continue
                editing.
              </p>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] shadow-md"
              >
                Continue Editing
              </button>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Auto-saved just now
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Publish Dialog */}
      {showPublishDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg animate-fade-in shadow-2xl border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 ring-8 ring-blue-50">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Publish?
              </h3>
              <p className="text-gray-600 mb-8">
                Your form will be live and accessible to users. This action
                cannot be undone.
              </p>

              <div className="w-full space-y-4 mb-8">
                <div className="flex items-start gap-4 p-5 bg-linear-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      {Object.keys(fieldConfigs).length} Fields Configured
                    </p>
                    <p className="text-sm text-gray-600">
                      All fields are validated and ready for data collection
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-linear-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      Performance Optimized
                    </p>
                    <p className="text-sm text-gray-600">
                      Fast loading with responsive design across all devices
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-linear-to-r from-gray-50/80 to-slate-50/80 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      Security Verified
                    </p>
                    <p className="text-sm text-gray-600">
                      All security measures and data validations are active
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowPublishDialog(false)}
                  className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
                >
                  Review Again
                </button>
                <button
                  onClick={handleConfirmPublish}
                  disabled={publishMasterObject.isPending}
                  className="flex-1 px-6 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-60"
                >
                  {publishMasterObject.isPending
                    ? "Publishing..."
                    : "Publish Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              className="h-8 w-8"
              onClick={() => window.history.back()}
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  FormFlow Builder
                </h1>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-200" />

            <nav className="flex items-center gap-1">
              <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-200/50">
                {views.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setMode(view.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                      mode === view.id
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                    title={view.description}
                  >
                    <view.icon className="w-4 h-4" />
                    {view.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={history.length === 0}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                title="Undo (⌘Z)"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={future.length === 0}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                title="Redo (⌘⇧Z)"
              >
                <Redo2 className="w-5 h-5" />
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>

              <button
                onClick={() => console.log("Export")}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            <div className="h-4 w-px bg-gray-200" />

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] group"
            >
              <Send className="w-3 h-3" />
              Publish Form
            </button>

            {/* <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <HelpCircle className="w-5 h-5" />
            </button> */}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
            sidebarCollapsed ? "w-16" : "w-80"
          }`}
        >
          <div className="p-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-gray-900">Elements</h2>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      v2.1
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag & drop to build your form
                  </p>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`flex-1 overflow-auto p-4 ${
              sidebarCollapsed ? "flex flex-col items-center gap-3" : ""
            }`}
          >
            <FieldPalette collapsed={sidebarCollapsed} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto scrollbar-hide">
          {mode === "EDIT" && (
            <div className="p-4 max-w-6xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <h1 className="text-md font-bold text-gray-900">
                        Design Workspace
                      </h1>
                    </div>
                    <p className="text-gray-600 text-xs">
                      Build your form by dragging elements from the sidebar
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      AI Assist
                    </button>
                    {/* <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Settings
                    </button> */}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-8 min-h-[600px]">
                    <FormCanvas />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "PREVIEW" && (
            <div className="p-6">
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <h1 className="text-md font-bold text-gray-900">
                          Preview Mode
                        </h1>
                      </div>
                      <p className="text-gray-600 text-xs">
                        Test how your form behaves for end users
                      </p>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <div className="flex bg-gray-100 rounded-xl p-1.5">
                        <button
                          onClick={() => setPreviewDevice("mobile")}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            previewDevice === "mobile"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Smartphone className="w-4 h-4" />
                          Mobile
                        </button>
                        <button
                          onClick={() => setPreviewDevice("desktop")}
                          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            previewDevice === "desktop"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Monitor className="w-4 h-4" />
                          Desktop
                        </button>
                      </div>
                    </div> */}
                  </div>

                  <div
                    className={`bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden ${
                      previewDevice === "mobile"
                        ? "max-w-sm mx-auto"
                        : "max-w-4xl mx-auto"
                    }`}
                  >
                    <div
                      className={`p-8 ${
                        previewDevice === "mobile" ? "p-6" : "p-10"
                      }`}
                    >
                      <FormRenderer
                        schema={schema}
                        fields={fieldConfigs}
                        mode="CREATE"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "SPLIT" && (
            <div className="h-full flex flex-col p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                      <h1 className="text-md font-bold text-gray-900">
                        Split View
                      </h1>
                    </div>
                    <p className="text-gray-600 text-xs">
                      Edit and preview changes in real-time
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 flex-1">
                {/* Editor Panel */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      <h3 className="font-semibold text-md text-gray-900">
                        Editor
                      </h3>
                    </div>
                    <span className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                      Live Editing
                    </span>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-auto p-6">
                      <FormCanvas />
                    </div>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      <h3 className="font-semibold text-gray-900">Preview</h3>
                    </div>
                    <span className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium">
                      Real-time
                    </span>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-auto p-6">
                      <FormRenderer
                        schema={schema}
                        fields={fieldConfigs}
                        mode="PREVIEW"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Panel */}
        <aside
          className={`bg-white border-l border-gray-200 transition-all duration-300 flex flex-col ${
            configPanelCollapsed ? "w-16" : "w-96"
          }`}
        >
          <div className="p-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!configPanelCollapsed && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-gray-900">Properties</h2>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Configure field properties and behavior
                  </p>
                </div>
              )}
              <button
                onClick={() => setConfigPanelCollapsed(!configPanelCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title={configPanelCollapsed ? "Expand panel" : "Collapse panel"}
              >
                {configPanelCollapsed ? (
                  <ChevronLeft className="w-5 h-5 text-gray-500 rotate-180" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {!configPanelCollapsed && (
            <>
              <div className="flex-1 overflow-auto p-4">
                <FieldConfigPanel />
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
