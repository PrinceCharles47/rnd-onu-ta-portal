import DocumentsLayout from "../../pages/documents/DocumentsLayout";
import DocumentsPage from "../../pages/documents/DocumentsPage";

export const documentsRoutes = {
  path: "/documents",
  children: [
    {
      Component: DocumentsLayout,
      children: [
        {
          index: true,
          Component: DocumentsPage,
        },
      ],
    },
  ],
};
